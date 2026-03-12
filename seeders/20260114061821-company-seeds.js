"use strict";
const fs = require("fs");
const path = require("path");

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const DATA_DIR = path.join(__dirname, "./company");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const company = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, "..", "company.json"), "utf8")
    );

    const emitenData = company?.data.map((file, key) => {
      const { data } = JSON.parse(
        fs.readFileSync(path.join(DATA_DIR, `${file.kode}.json`), "utf8")
      );

      return {
        id: ++key,
        ticker: data.Kode,
        name: data?.Nama,
        logo: data?.logo,
        office_address: data?.["Alamat Kantor"],
        email: data?.["Alamat Email"],
        phone: data?.Telepon,
        fax: data?.Fax,
        tin: data?.NPWP,
        website: data?.Situs,
        listing_date: data?.["Tanggal Pencatatan"],
        listing_board: data?.["Papan Pencatatan"],
        main_business: data?.["Bidang Usaha Utama"],
        sector: data?.Sektor,
        subsector: data?.Subsektor,
        industry: data?.Industri,
        subindustry: data?.Subindustri,
        share_registery: data?.["Biro Administrasi Efek"],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    /** 2 Extract DISTINCT industries */
    const industries = [
      ...new Set(emitenData.map((item) => item.industry).filter(Boolean)),
    ]
      .sort((a, b) => a.localeCompare(b))
      .map((industry, key) => ({
        id: ++key,
        name: industry,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    // console.log(industries);

    // return queryInterface.bulkInsert("m_industries", industries);

    /** 3 Extract DISTINCT subIndustries */
    const subIndustries = [
      { name: "Agen Perjalanan", industries_id: 32 },
      { name: "Alas Kaki", industries_id: 31 },
      { name: "Alumunium", industries_id: 21 },
      { name: "Aplikasi & Jasa Internet", industries_id: 1 },

      { name: "Asuransi Jiwa", industries_id: 2 },
      { name: "Asuransi Umum", industries_id: 2 },
      { name: "Reasuransi", industries_id: 2 },

      { name: "Baja & Besi", industries_id: 21 },
      { name: "Ban", industries_id: 19 },
      { name: "Suku Cadang Otomotif", industries_id: 19 },

      { name: "Bank", industries_id: 3 },
      { name: "Bank Investasi & Perantara Perdagangan", industries_id: 13 },

      { name: "Barang Elektronik Konsumen", industries_id: 4 },

      { name: "Barang Kimia Dasar", industries_id: 5 },
      { name: "Barang Kimia Khusus", industries_id: 5 },
      { name: "Barang Kimia Pertanian", industries_id: 5 },

      { name: "Department Store", industries_id: 8 },
      { name: "Distributor Barang Konsumen", industries_id: 9 },

      { name: "Distribusi Batu Bara", industries_id: 35 },
      { name: "Produksi Batu Bara", industries_id: 7 },

      { name: "Emas", industries_id: 21 },
      { name: "Tembaga", industries_id: 21 },
      { name: "Logam & Mineral Lainnya", industries_id: 21 },

      { name: "Farmasi", industries_id: 10 },
      { name: "Ritel & Distributor Obat-obatan", industries_id: 54 },

      { name: "Fasilitas Rekreasi & Olah Raga", industries_id: 32 },
      { name: "Hiburan & Film", industries_id: 11 },

      { name: "Hotel, Resor & Kapal Pesiar", industries_id: 32 },

      { name: "Ikan, Daging & Produk Unggas", industries_id: 52 },
      { name: "Produk Susu Olahan", industries_id: 23 },

      { name: "Jasa & Konsultan TI", industries_id: 12 },

      {
        name: "Jasa & Perlengkapan Minyak, Gas & Batu Bara",
        industries_id: 35,
      },
      { name: "Jasa Pengeboran Minyak & Gas", industries_id: 35 },
      { name: "Penyimpanan & Distribusi Minyak & Gas", industries_id: 29 },
      { name: "Produksi & Penyulingan Minyak & Gas", industries_id: 29 },

      { name: "Jasa Pendidikan", industries_id: 34 },
      { name: "Jasa Pendukung Bisnis", industries_id: 14 },
      { name: "Jasa Penelitian & Konsultasi", industries_id: 15 },
      { name: "Jasa Personalia", industries_id: 15 },

      { name: "Jasa Pengelolaan Lingkungan & Sarana", industries_id: 14 },

      { name: "Jasa Real Estat", industries_id: 37 },
      { name: "Pengembang & Operator Real Estat", industries_id: 37 },

      { name: "Jasa Telekomunikasi Kabel", industries_id: 16 },
      { name: "Jasa Telekomunikasi Nirkabel", industries_id: 17 },
      { name: "Jasa Telekomunikasi Terintegrasi", industries_id: 16 },

      { name: "Kayu", industries_id: 48 },
      { name: "Kertas", industries_id: 48 },
      { name: "Produk Hutan Lainnya", industries_id: 48 },

      { name: "Komponen & Peralatan Kelistrikan", industries_id: 18 },

      { name: "Konstruksi Bangunan", industries_id: 20 },
      { name: "Material Konstruksi", industries_id: 25 },
      { name: "Produk & Perlengkapan Bangunan", industries_id: 51 },

      { name: "Logistik & Pengantaran", industries_id: 22 },

      { name: "Makanan Olahan", industries_id: 23 },
      { name: "Ritel & Distributor Makanan", industries_id: 47 },
      { name: "Supermarket", industries_id: 47 },
      { name: "Rumah Makan", industries_id: 32 },

      { name: "Manajemen Investasi", industries_id: 13 },
      { name: "Perusahaan Investasi", industries_id: 49 },
      { name: "Perusahaan Holding Keuangan", industries_id: 49 },
      { name: "Perusahaan Holding Multi-sektor", industries_id: 50 },

      { name: "Maskapai Penerbangan", industries_id: 24 },

      { name: "Mesin & Komponen Perindustrian", industries_id: 27 },
      { name: "Mesin Konstruksi & Kendaraan Berat", industries_id: 27 },

      { name: "Minuman Keras", industries_id: 28 },
      { name: "Minuman Ringan", industries_id: 28 },

      { name: "Operator Bandar Udara", industries_id: 30 },
      { name: "Operator Jalan Tol & Rel", industries_id: 30 },
      { name: "Operator Pelabuhan", industries_id: 30 },

      { name: "Pakaian, Aksesoris, & Tas", industries_id: 31 },
      { name: "Tekstil", industries_id: 31 },

      { name: "Pembiayaan Konsumen", industries_id: 33 },

      { name: "Penerbitan", industries_id: 26 },
      { name: "Penyiaran", industries_id: 26 },
      { name: "Penyiaran Berbayar", industries_id: 26 },
      { name: "Periklanan", industries_id: 26 },

      {
        name: "Penyedia & Distribusi Perlengkapan Kesehatan",
        industries_id: 39,
      },
      { name: "Penyedia Jasa Kesehatan", industries_id: 38 },

      { name: "Peralatan Energi Alternatif", industries_id: 40 },
      { name: "Peralatan Jaringan", industries_id: 41 },
      { name: "Peralatan Kantor", industries_id: 6 },
      { name: "Peralatan Olah Raga & Barang Hobi", industries_id: 42 },
      { name: "Peralatan Rumah Tangga", industries_id: 6 },

      { name: "Perangkat & Instrumen Elektronik", industries_id: 45 },
      { name: "Perangkat Komputer", industries_id: 43 },
      { name: "Perangkat Lunak", industries_id: 44 },

      { name: "Percetakan Komersial", industries_id: 26 },
      { name: "Perdagangan Aneka Barang Perindustrian", industries_id: 46 },

      { name: "Perkebunan & Tanaman Pangan", industries_id: 52 },

      { name: "Perlengkapan Rumah Tangga", industries_id: 6 },
      { name: "Produsen Furnitur Rumah", industries_id: 6 },

      { name: "Produk Perawatan Tubuh", industries_id: 53 },

      { name: "Ritel Barang Rumah Tangga", industries_id: 47 },
      { name: "Ritel Elektronik", industries_id: 54 },
      { name: "Ritel Otomotif", industries_id: 54 },
      { name: "Ritel Pakaian & Tekstil", industries_id: 54 },

      { name: "Rokok", industries_id: 55 },

      { name: "Transportasi Jalanan", industries_id: 36 },

      { name: "Utilitas Gas", industries_id: 56 },
      { name: "Utilitas Listrik", industries_id: 57 },

      { name: "Wadah & Kemasan", industries_id: 58 },
    ]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((industry, key) => ({
        id: ++key,
        name: industry.name,
        industries_id: industry.industries_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    // return queryInterface.bulkInsert("m_sub_industries", subIndustries);

    /** 3 Extract DISTINCT industries */
    const sectors = [
      ...new Set(emitenData.map((item) => item.sector).filter(Boolean)),
    ]
      .sort((a, b) => a.localeCompare(b))
      .map((sector, key) => ({
        id: ++key,
        name: sector,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    /** 4 Extract DISTINCT industries */
    const subsectors = [
      { name: "Asuransi", sector_id: 7 },
      { name: "Bank", sector_id: 7 },

      { name: "Barang Baku", sector_id: 1 },

      { name: "Barang Perindustrian", sector_id: 8 },
      { name: "Jasa Perindustrian", sector_id: 8 },
      { name: "Konstruksi Bangunan", sector_id: 8 },
      { name: "Otomotif & Komponen Otomotif", sector_id: 8 },

      { name: "Barang Rekreasi", sector_id: 2 },
      { name: "Barang Rumah Tangga", sector_id: 2 },
      { name: "Pakaian & Barang Mewah", sector_id: 2 },
      { name: "Produk Rumah Tangga Tidak Tahan Lama", sector_id: 2 },
      { name: "Perdagangan Ritel", sector_id: 2 },

      { name: "Barang Konsumen Primer", sector_id: 3 },
      { name: "Makanan & Minuman", sector_id: 3 },
      { name: "Perdagangan Ritel Barang Primer", sector_id: 3 },
      { name: "Rokok", sector_id: 3 },

      { name: "Energi Alternatif", sector_id: 4 },
      { name: "Minyak, Gas & Batu Bara", sector_id: 4 },

      { name: "Infrastruktur Transportasi", sector_id: 5 },
      { name: "Telekomunikasi", sector_id: 5 },
      { name: "Utilitas", sector_id: 5 },

      { name: "Farmasi & Riset Kesehatan", sector_id: 6 },
      { name: "Jasa & Peralatan Kesehatan", sector_id: 6 },

      { name: "Jasa Investasi", sector_id: 7 },
      { name: "Jasa Pembiayaan", sector_id: 7 },
      { name: "Perusahaan Holding & Investasi", sector_id: 7 },
      { name: "Perusahaan Holding Multi Sektor", sector_id: 7 },

      { name: "Media & Hiburan", sector_id: 2 },

      { name: "Perangkat Keras & Peralatan Teknologi", sector_id: 10 },
      { name: "Perangkat Lunak & Jasa TI", sector_id: 10 },

      { name: "Properti & Real Estat", sector_id: 9 },

      { name: "Transportasi", sector_id: 11 },
      { name: "Logistik & Pengantaran", sector_id: 11 },

      { name: "Jasa Konsumen", sector_id: 2 },
    ]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((sector, key) => ({
        id: ++key,
        name: sector.name,
        sector_id: sector.sector_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    // return queryInterface.bulkInsert("m_sub_sectors", subsectors);

    /** 4 Extract DISTINCT share_registery */
    const share_registery = [
      ...new Set(
        emitenData.map((item) => item.share_registery).filter(Boolean)
      ),
    ]
      .sort((a, b) => a.localeCompare(b))
      .map((sector, key) => ({
        id: ++key,
        name: sector,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    // return queryInterface.bulkInsert("m_share_registeries", share_registery);

    // console.log(share_registery);

    /** 5 m_companies */
    const emitenData_2 = company?.data.map((file, key) => {
      const { data } = JSON.parse(
        fs.readFileSync(path.join(DATA_DIR, `${file.kode}.json`), "utf8")
      );

      return {
        id: ++key,
        ticker: data.Kode,
        name: data?.Nama,
        Sekretaris_Perusahaan: data?.["Sekretaris Perusahaan"],
        Direktur: data?.["Direktur"],
        Komisaris: data?.Komisaris,
        Komite_Audit: data?.["Komite Audit"],
        Pemegang_Saham: data?.["Pemegang Saham"],
        Anak_Perusahaan: data?.["Anak Perusahaan"],
        // logo: data?.logo,
        // office_address: data?.["Alamat Kantor"],
        // email: data?.["Alamat Email"],
        // phone: data?.Telepon,
        // fax: data?.Fax,
        // tin: data?.NPWP,
        // website: data?.Situs,
        // listing_date: data?.["Tanggal Pencatatan"],
        // listing_board: data?.["Papan Pencatatan"],
        // main_business: data?.["Bidang Usaha Utama"],
        // sector_id: sectors?.find((item) => item.name === data?.Sektor)?.id,
        // subsector_id: subsectors?.find((item) => item.name === data?.Subsektor)
        //   ?.id,
        // industry_id: industries?.find((item) => item.name === data?.Industri)
        //   ?.id,
        // subindustry_id: subIndustries.find(
        //   (item) => item.name === data?.Subindustri
        // )?.id,
        // share_registery_id: share_registery?.find(
        //   (item) => item.name === data?.["Biro Administrasi Efek"]
        // )?.id,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      };
    });

    // return queryInterface.bulkInsert("m_companies", emitenData_2);

    /** 6 m_companies_management Sekretaris_Perusahaan */
    const Sekretaris_Perusahaan = emitenData_2?.map((item, key) => ({
      company_id: item?.id,
      name: item.Sekretaris_Perusahaan?.Nama,
      type: "SEKRETARIS PERUSAHAAN",
      position: "SEKRETARIS PERUSAHAAN",
      phone: item.Sekretaris_Perusahaan?.["Nomor Telepon"],
      email: item.Sekretaris_Perusahaan?.["Alamat Email"],
      is_affiliated: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // return queryInterface.bulkInsert(
    //   "m_company_managements",
    //   Sekretaris_Perusahaan
    // );

    /** 6 m_companies_management Direktur */
    // const Direktur = emitenData_2
    //   ?.map((items) => ({
    //     direktur: items?.Direktur?.filter((item) => item.name !== "")?.map(
    //       (item, key) => ({
    //         company_id: items?.id,
    //         name: item?.nama,
    //         type: "DIREKSI",
    //         position: item?.posisi === "" ? "-" : item?.posisi,
    //         phone: "-",
    //         email: "-",
    //         is_affiliated:
    //           item?.terafiliasi.toLowerCase() === "ya" ? true : false,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //       })
    //     ),
    //   }))
    //   .flatMap((item) => item.direktur);

    // return queryInterface.bulkInsert("m_company_managements", Direktur);

    /** 7 m_companies_management Komisaris */
    // const Komisaris = emitenData_2
    //   ?.map((items) => ({
    //     direktur: items?.Komisaris?.filter((item) => item.name !== "")?.map(
    //       (item, key) => ({
    //         company_id: items?.id,
    //         name: item?.nama,
    //         type: "KOMISARIS",
    //         position: item?.posisi === "" ? "-" : item?.posisi,
    //         phone: "-",
    //         email: "-",
    //         is_affiliated:
    //           item?.terafiliasi.toLowerCase() === "ya" ? true : false,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //       })
    //     ),
    //   }))
    //   .flatMap((item) => item.direktur);

    // return queryInterface.bulkInsert("m_company_managements", Komisaris);

    /** 8 m_companies_management Komite_Audit */
    // const Komite_Audit = emitenData_2
    //   ?.map((items) => ({
    //     direktur: items?.Komite_Audit?.filter((item) => item.name !== "")?.map(
    //       (item, key) => ({
    //         company_id: items?.id,
    //         name: item?.nama,
    //         type: "KOMITE AUDIT",
    //         position: item?.posisi === "" ? "-" : item?.posisi.toUpperCase(),
    //         phone: "-",
    //         email: "-",
    //         is_affiliated: false,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //       })
    //     ),
    //   }))
    //   .flatMap((item) => item.direktur);

    // return queryInterface.bulkInsert("m_company_managements", Komite_Audit);

    /** 9 m_companies_management Komite_Audit */
    // const Komite_Audit = emitenData_2
    //   ?.map((items) => ({
    //     direktur: items?.Komite_Audit?.filter((item) => item.name !== "")?.map(
    //       (item, key) => ({
    //         company_id: items?.id,
    //         name: item?.nama,
    //         type: "KOMITE AUDIT",
    //         position: item?.posisi === "" ? "-" : item?.posisi.toUpperCase(),
    //         phone: "-",
    //         email: "-",
    //         is_affiliated: false,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //       })
    //     ),
    //   }))
    //   .flatMap((item) => item.direktur);

    // return queryInterface.bulkInsert("m_company_managements", Komite_Audit);

    /** 10 m_companies_management Shareholder */
    // const Shareholder = emitenData_2
    //   ?.map((items) => ({
    //     direktur: items?.Pemegang_Saham?.filter(
    //       (item) => item.name !== ""
    //     )?.map((item, key) => ({
    //       company_id: items?.id,
    //       name: item?.nama,
    //       type: item?.tipe,
    //       total: item?.jumlah,
    //       percentage: item?.persentase,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     })),
    //   }))
    //   .flatMap((item) => item.direktur);

    // return queryInterface.bulkInsert("m_shareholders", Shareholder);

    /** 11 m_company_subsidiaries Subsidiaries */
    const Subsidiaries = emitenData_2
      ?.map((items) => ({
        direktur: items?.Anak_Perusahaan?.filter(
          (item) => item.name !== ""
        )?.map((item, key) => ({
          company_id: items?.id,
          name: item?.nama,
          type: item?.jenis,
          asset: item?.["aset total"],
          percentage: item?.persentase,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      }))
      .flatMap((item) => item.direktur);

    return queryInterface.bulkInsert("m_company_subsidiaries", Subsidiaries);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
