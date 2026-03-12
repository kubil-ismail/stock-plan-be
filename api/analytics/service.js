const { Sequelize } = require("sequelize");
const model = require("../../models");

exports.findShareholderRelated = (params) => {
  const { shareholder_name, ticker } = params || {};

  return new Promise(async (resolve, reject) => {
    try {
      const sql = `
       WITH base AS (
        SELECT DISTINCT
          LOWER(s.name) AS shareholder_name,
          c.id AS company_id,
          c.ticker,
          c.name AS company_name,
          s.type AS shareholder_type,
          COALESCE(
            NULLIF(REPLACE(s.percentage, '%', ''), '')::numeric,
            0
          ) AS percentage_num
        FROM m_shareholders s
        JOIN m_companies c ON c.id = s.company_id
        WHERE LOWER(s.name) !~ '(treasury|masyarakat|pengendali)'
      ),
      filtered_shareholders AS (
        SELECT DISTINCT shareholder_name
        FROM base
        WHERE
          (:shareholder_name IS NULL OR shareholder_name ILIKE '%' || :shareholder_name || '%')
          AND (
            :ticker IS NULL
            OR ticker = UPPER(:ticker)
          )
      )
      SELECT
        b.shareholder_name,
        COUNT(*) AS total_companies,
        ROUND(AVG(b.percentage_num), 2) AS avg_percentage_owned,
        ARRAY_AGG(
          jsonb_build_object(
            'id', b.company_id,
            'ticker', b.ticker,
            'name', b.company_name,
            'type', b.shareholder_type,
            'percentage', b.percentage_num
          )
          ORDER BY b.ticker
        ) AS companies
      FROM base b
      JOIN filtered_shareholders f
        ON f.shareholder_name = b.shareholder_name
      GROUP BY b.shareholder_name
      ORDER BY total_companies DESC;
      `;

      const result = await model.sequelize.query(sql, {
        replacements: {
          shareholder_name: shareholder_name
            ? shareholder_name.toLowerCase()
            : null,
          ticker: ticker ? ticker.toUpperCase() : null,
        },
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });

      resolve(result);
    } catch (error) {
      console.error(error);
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findSubsidiariesRelated = (params) => {
  const { subsidiary_name, ticker } = params || {};

  return new Promise(async (resolve, reject) => {
    try {
      const sql = `
      WITH normalized_subsidiaries AS (
        SELECT
          cs.company_id,
          c.ticker,
          c.name AS parent_name,

          cs.type,
          cs.asset,
          cs.percentage,

          TRIM(
            REGEXP_REPLACE(
              LOWER(cs.name),
              '(pt|tbk|persero|\\(persero\\))',
              '',
              'g'
            )
          ) AS subsidiary_name
        FROM m_company_subsidiaries cs
        JOIN m_companies c ON c.id = cs.company_id
        WHERE LOWER(cs.name) !~ '(tidak ditemukan)'
      ),

      subsidiary_groups AS (
        SELECT
          subsidiary_name,
          COUNT(DISTINCT company_id) AS total_parent_companies
        FROM normalized_subsidiaries
        GROUP BY subsidiary_name
        HAVING COUNT(DISTINCT company_id) > 1
      ),

      filtered_subsidiaries AS (
        SELECT DISTINCT sg.subsidiary_name
        FROM subsidiary_groups sg
        JOIN normalized_subsidiaries ns
          ON ns.subsidiary_name = sg.subsidiary_name
        WHERE
          (:subsidiary_name IS NULL
            OR sg.subsidiary_name ILIKE '%' || :subsidiary_name || '%')
          AND
          (:ticker IS NULL
            OR ns.ticker = UPPER(:ticker))
      )

      SELECT
        sg.subsidiary_name,
        sg.total_parent_companies,
        ARRAY_AGG(
          jsonb_build_object(
            'id', ns.company_id,
            'ticker', ns.ticker,
            'name', ns.parent_name,
            'type', ns.type,
            'asset', ns.asset,
            'percentage', ns.percentage
          )
          ORDER BY ns.ticker
        ) AS parent_companies
      FROM subsidiary_groups sg
      JOIN filtered_subsidiaries fs
        ON fs.subsidiary_name = sg.subsidiary_name
      JOIN normalized_subsidiaries ns
        ON ns.subsidiary_name = sg.subsidiary_name
      GROUP BY
        sg.subsidiary_name,
        sg.total_parent_companies
      ORDER BY sg.total_parent_companies DESC;
      `;

      const result = await model.sequelize.query(sql, {
        replacements: {
          subsidiary_name: subsidiary_name
            ? subsidiary_name.toLowerCase()
            : null,
          ticker: ticker ? ticker.toUpperCase() : null,
        },

        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });

      resolve(result);
    } catch (error) {
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};

exports.findManagementRelated = (params) => {
  const { management_name, ticker } = params || {};

  return new Promise(async (resolve, reject) => {
    try {
      const sql = `
      SELECT
        management_name,
        COUNT(*) AS total_companies,
        JSONB_AGG(
          JSONB_BUILD_OBJECT(
            'company_id', company_id,
            'ticker', ticker,
            'company_name', company_name,
            'type', type,
            'position', position,
            'is_affiliated', is_affiliated
          )
          ORDER BY ticker
        ) AS companies
      FROM (
        SELECT DISTINCT
          LOWER(TRIM(m.name)) AS management_name,
          c.id AS company_id,
          c.ticker,
          c.name AS company_name,
          m.type,
          m.position,
          m.is_affiliated
        FROM m_company_managements m
        JOIN m_companies c
          ON c.id = m.company_id
      ) t
      WHERE
        (
          :management_name IS NULL
          OR management_name ILIKE '%' || :management_name || '%'
        )
        AND (
          :ticker IS NULL
          OR management_name IN (
            SELECT LOWER(TRIM(m2.name))
            FROM m_company_managements m2
            JOIN m_companies c2
              ON c2.id = m2.company_id
            WHERE c2.ticker = UPPER(:ticker)
          )
        )
      GROUP BY management_name
      ORDER BY total_companies DESC;
      `;

      const result = await model.sequelize.query(sql, {
        replacements: {
          management_name: management_name
            ? management_name.toLowerCase()
            : null,
          ticker: ticker ? ticker.toUpperCase() : null,
        },
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });

      resolve(result);
    } catch (error) {
      console.error(error);
      reject(
        { ...error?.errors?.[0], code: 400 } ?? {
          code: 500,
          message: "Something Wrong in our app",
        }
      );
    }
  });
};
