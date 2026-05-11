"use client"

import { useEffect, useState } from "react"
import { getGoogleSheetData } from "@/lib/googleSheet"

export default function Home() {

  const [documents, setDocuments] = useState([])
  const [results, setResults] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {

    try {

      const data = await getGoogleSheetData()

      setDocuments(data)
      setLoading(false)

    } catch (error) {

      console.log(error)
      setLoading(false)

    }

  }

  /* REALTIME SEARCH */
  useEffect(() => {

    if (!search.trim()) {

      setResults([])
      return

    }

    const keyword =
      search.toLowerCase().trim()

    const filtered =
      documents.filter((item) => {

        const gabungan = `
          ${item.Nama || ""}
          ${item.Keyword || ""}
          ${item.Kategori || ""}
          ${item.Tipe || ""}
          ${item.Tahun || ""}
          ${item.Bulan || ""}
          ${item.Tanggal || ""}
        `
          .toLowerCase()

        return gabungan.includes(keyword)

      })

    setResults(filtered)

  }, [search, documents])

  function handleSearch() {

    if (!search.trim()) {

      setResults([])
      return

    }

    const keyword =
      search.toLowerCase().trim()

    const filtered =
      documents.filter((item) => {

        const gabungan = `
          ${item.Nama || ""}
          ${item.Keyword || ""}
          ${item.Kategori || ""}
          ${item.Tipe || ""}
          ${item.Tahun || ""}
          ${item.Bulan || ""}
          ${item.Tanggal || ""}
        `
          .toLowerCase()

        return gabungan.includes(keyword)

      })

    setResults(filtered)

  }

  return (

    <div className="min-h-screen relative pb-28">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">

        <img
          src="https://i.imgur.com/gPX6ggr.png"
          alt="Background"
          className="
            w-full
            h-full
            object-cover
          "
        />

        <div className="
          absolute
          inset-0
          bg-white/20
          backdrop-blur-[1px]
        " />

      </div>

      {/* HEADER */}
      <header className="
        relative
        z-10
        w-full
        bg-white/70
        backdrop-blur-xl
        shadow-md
        border-b
        border-white/30
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-4
          md:px-8
          py-4
          flex
          items-center
        ">

          {/* LOGO */}
          <img
            src="https://i.imgur.com/pzIV8If.png"
            alt="Logo"
            className="
              w-16
              h-16
              md:w-24
              md:h-24
              object-contain
              mr-4
            "
          />

          {/* TEXT */}
          <div>

            <h1 className="
              text-red-700
              font-black
              leading-tight
              text-[15px]
              md:text-4xl
            ">
              PT TUNAS JAYA SANUR
              <br className="md:hidden" />
              (GROUP)
            </h1>

            <p className="
              font-semibold
              text-black
              text-[10px]
              md:text-lg
              mt-1
            ">
              Departemen General Affair
            </p>

          </div>

        </div>

      </header>

      {/* HERO */}
      <section className="
        relative
        z-10
        w-full
        px-4
        md:px-8
        py-10
        md:py-20
      ">

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <h2 className="
            font-black
            text-[#020826]
            leading-[0.95]
            tracking-[-2px]
            text-[38px]
            md:text-7xl
            whitespace-nowrap
          ">
            Cari Arsip Digital
          </h2>

          {/* SEARCH */}
          <div className="
            mt-10
            flex
            items-center
            bg-white/75
            backdrop-blur-xl
            rounded-[28px]
            shadow-2xl
            overflow-hidden
            border
            border-white/40
          ">

            <input
              type="text"
              placeholder="Cari dokumen arsip..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  handleSearch()

                }

              }}
              className="
                flex-1
                px-5
                md:px-10
                py-5
                md:py-7
                outline-none
                bg-transparent
                text-[#020826]
                placeholder:text-gray-500
                text-base
                md:text-2xl
                font-black
              "
            />

            <button
              onClick={handleSearch}
              className="
                bg-red-600
                hover:bg-red-700
                transition
                text-white
                font-black
                px-5
                md:px-8
                py-4
                text-sm
                md:text-base
                rounded-[18px]
                mr-2
                shadow-lg
              "
            >
              ENTER
            </button>

          </div>

          {/* LOADING */}
          {
            loading && (

              <div className="
                text-center
                mt-20
                text-xl
                font-bold
                text-white
              ">
                Loading...
              </div>

            )
          }

          {/* EMPTY */}
          {
            !loading &&
            results.length === 0 &&
            search !== "" && (

              <div className="
                mt-20
                bg-white/75
                backdrop-blur-xl
                rounded-[35px]
                shadow-xl
                p-10
                md:p-20
                text-center
                border
                border-white/40
              ">

                <div className="
                  text-7xl
                  md:text-8xl
                  mb-6
                ">
                  📂
                </div>

                <h3 className="
                  text-3xl
                  md:text-6xl
                  font-black
                  text-[#020826]
                ">
                  Dokumen Tidak Ditemukan
                </h3>

              </div>

            )
          }

          {/* RESULTS */}
          <div className="mt-16 space-y-8">

            {
              results.map((item, index) => (

                <div
                  key={index}
                  className="
                    bg-white/75
                    backdrop-blur-xl
                    rounded-[30px]
                    shadow-2xl
                    border
                    border-white/40
                    p-6
                    md:p-10
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >

                  {/* LEFT */}
                  <div className="flex items-start">

                    <div className="
                      w-14
                      h-14
                      md:w-20
                      md:h-20
                      rounded-2xl
                      bg-red-600
                      flex
                      items-center
                      justify-center
                      text-white
                      text-2xl
                      md:text-3xl
                      mr-5
                      shadow-lg
                    ">
                      📄
                    </div>

                    <div>

                      <h3 className="
                        text-2xl
                        md:text-5xl
                        font-black
                        text-[#020826]
                        leading-tight
                      ">
                        {item.Nama}
                      </h3>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <a
                    href={item.Link}
                    target="_blank"
                    className="
                      mt-6
                      md:mt-0
                      bg-red-600
                      hover:bg-red-700
                      transition
                      text-white
                      font-black
                      px-7
                      md:px-10
                      py-4
                      rounded-2xl
                      text-sm
                      md:text-lg
                      shadow-lg
                      text-center
                    "
                  >
                    Buka File
                  </a>

                </div>

              ))
            }

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <div className="
        fixed
        bottom-0
        left-0
        w-full
        bg-red-700
        text-white
        py-3
        z-50
        shadow-2xl
      ">

        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="7"
          className="
            font-bold
            text-xs
            md:text-lg
          "
        >

          Info lebih lanjut hubungi :

          <a
            href="https://wa.me/62881037378266"
            target="_blank"
            className="ml-3"
          >
            📞 0881037378266 - I Kadek Pratiwa Suarnata (Petugas Arsip)
          </a>

        </marquee>

      </div>

    </div>

  )

}