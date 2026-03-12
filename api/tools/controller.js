const { formatRupiah } = require("../../utils/helper");

exports.getEntryPlan = async (req, res) => {
  try {
    const {
      symbol,
      capital,
      risk_per_trade_pct = 2,

      fee = {
        buy_pct: 0.0015,
        sell_pct: 0.0025,
      },

      price = {},
      volume = {},
      technical = {},
      fundamental,
    } = req.body;

    if (!capital || !technical || !price) {
      return res.status(400).json({
        status: false,
        message: "Invalid payload",
      });
    }

    const { open, high, low, close } = price;

    const {
      ma = {},
      rsi14,
      macd = {},
      atr = 0,
      support,
      resistance,
    } = technical;

    const { ma5, ma20 } = ma;

    /* ================= ENTRY LOGIC ================= */

    const momentum_ok =
      rsi14 > 30 &&
      rsi14 < 70 &&
      macd.line > macd.signal &&
      volume.today > volume.avg_5;

    const trend_ok = close >= ma20 && ma5 >= ma20;

    const entry_price = Math.round(Math.max(support, ma20) * 1.005);

    const entry_signal =
      momentum_ok && trend_ok && entry_price <= resistance * 0.97;

    // if (!entry_signal) {
    //   return res.json({
    //     status: true,
    //     message: "No valid trade setup",
    //     decision: "SKIP",
    //   });
    // }

    /* ================= CUT LOSS ================= */

    const cutloss_price = Math.round(
      Math.min(support * 0.995, entry_price - atr)
    );

    const max_loss_rp = capital * (risk_per_trade_pct / 100);

    let shares = Math.floor(capital / entry_price);
    const risk_per_share = entry_price - cutloss_price;
    let actual_risk = shares * risk_per_share;

    if (actual_risk > max_loss_rp) {
      shares = Math.floor(max_loss_rp / risk_per_share);
      actual_risk = shares * risk_per_share;
    }

    const lot = Math.floor(shares / 100);

    /* ================= TAKE PROFIT ================= */

    const target_price_1 = entry_price + (entry_price - cutloss_price) * 2;

    const target_price_2 = resistance * 0.995;

    const take_profit_price = Math.round(
      Math.min(target_price_1, target_price_2)
    );

    /* ================= SIMULATION ================= */

    const fee_buy = shares * entry_price * (fee.buy_pct / 100);

    const fee_sell_tp = shares * take_profit_price * (fee.sell_pct / 100);

    const fee_sell_cl = shares * cutloss_price * (fee.sell_pct / 100);

    const gross_profit = shares * (take_profit_price - entry_price);

    const net_profit = gross_profit - fee_buy - fee_sell_tp;

    const gross_loss = shares * (entry_price - cutloss_price);

    const net_loss = gross_loss + fee_buy + fee_sell_cl;

    const profit_pct = (net_profit / capital) * 100;
    const loss_pct = (net_loss / capital) * 100;

    const risk_reward = net_profit / net_loss;

    /* ================= HOLD ESTIMATION ================= */

    const daily_range_pct = ((high - low) / close) * 100;

    const volatility_score = (daily_range_pct + (atr / close) * 100) / 2;

    let estimated_hold = "3–5 hari";
    if (volatility_score >= 3) estimated_hold = "1–2 hari";
    else if (volatility_score >= 2) estimated_hold = "2–3 hari";

    /* ================= VALUATION ================= */

    let valuation = "UNKNOWN";
    let valuation_score = 0;

    if (fundamental) {
      if (fundamental.pbv < 1.5) valuation_score++;
      if (fundamental.per < fundamental.sector_avg?.per) valuation_score++;
      if (fundamental.roe >= 10) valuation_score++;
      if (fundamental.eps > 0) valuation_score++;

      valuation =
        valuation_score >= 3
          ? "UNDERVALUE"
          : valuation_score === 2
          ? "NETRAL"
          : "OVERVALUE";
    }

    /* ================= CONFIDENCE SCORE ================= */

    let momentum_score = 0;
    if (rsi14 >= 40 && rsi14 <= 60) momentum_score += 10;
    else if (rsi14 > 30 && rsi14 < 70) momentum_score += 5;
    if (macd.line > macd.signal) momentum_score += 10;

    let trend_score = 0;
    if (close >= ma20) trend_score += 10;
    if (ma5 >= ma20) trend_score += 10;

    let rr_score = 0;
    if (risk_reward >= 3) rr_score = 25;
    else if (risk_reward >= 2) rr_score = 20;
    else if (risk_reward >= 1.5) rr_score = 15;
    else rr_score = 5;

    let volume_score = 0;
    const volume_ratio = volume.today / volume.avg_5;
    if (volume_ratio >= 2) volume_score = 15;
    else if (volume_ratio >= 1.5) volume_score = 10;
    else if (volume_ratio >= 1.2) volume_score = 5;

    let valuation_score_conf = 0;
    if (valuation === "UNDERVALUE") valuation_score_conf = 15;
    else if (valuation === "NETRAL") valuation_score_conf = 8;
    else valuation_score_conf = 3;

    const confidence_score_raw =
      momentum_score +
      trend_score +
      rr_score +
      volume_score +
      valuation_score_conf;

    const confidence_score = Math.min(100, Math.max(0, confidence_score_raw));

    let confidence_label = "LOW";
    if (confidence_score >= 80) confidence_label = "HIGH";
    else if (confidence_score >= 60) confidence_label = "MEDIUM";

    /* ================= FINAL DECISION ================= */

    const decision =
      risk_reward >= 1.5 && valuation !== "OVERVALUE" ? "EXECUTE" : "SKIP";

    /* ================= RESPONSE ================= */

    return res.json({
      status: true,
      message: "success",
      data: {
        symbol,
        signal: decision === "EXECUTE" ? "BUY" : "WAIT",

        price_level: {
          entry: formatRupiah(entry_price),
          cut_loss: formatRupiah(cutloss_price),
          take_profit: formatRupiah(take_profit_price),
        },

        position: {
          shares,
          lot,
          capital_used: formatRupiah(shares * entry_price),
        },

        simulation: {
          profit: {
            summary: `${formatRupiah(capital)} + ${formatRupiah(
              net_profit
            )} (${profit_pct.toFixed(2)}%)`,
            value: formatRupiah(net_profit),
            percentage: Number(profit_pct.toFixed(2)),
          },
          loss: {
            summary: `${formatRupiah(capital)} - ${formatRupiah(
              net_loss
            )} (${loss_pct.toFixed(2)}%)`,
            value: formatRupiah(net_loss),
            percentage: Number(loss_pct.toFixed(2)),
          },
          risk_reward: Number(risk_reward.toFixed(2)),
        },

        analysis: {
          momentum: momentum_ok ? "VALID" : "WEAK",
          trend: trend_ok ? "BULLISH" : "SIDEWAYS",
          valuation,
          valuation_score,
          confidence_score,
          confidence_label,
        },

        estimated_hold,
        decision,
      },
    });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
};
