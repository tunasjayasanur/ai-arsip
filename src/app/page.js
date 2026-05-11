'use client'

import { useEffect, useState } from 'react'
import { getGoogleSheetData } from '@/lib/googleSheet'

export default function Home(){

const [documents,setDocuments] = useState([])
const [results,setResults] = useState([])
const [search,setSearch] = useState('')
const [loading,setLoading] = useState(true)

useEffect(()=>{

async function loadData(){

const data =
await getGoogleSheetData()

setDocuments(data)

setLoading(false)

}

loadData()

},[])

/* SEARCH ENGINE */

function handleSearch(){

const keyword =
search.toLowerCase().trim()

if(keyword === ''){

setResults([])
return

}

const searchWords =
keyword.match(/\b[\w]+\b/g) || []

const filtered =
documents.filter((doc)=>{

const fullText = `

${doc.Nama || ''}
${doc.Keyword || ''}
${doc.Kategori || ''}
${doc.Tipe || ''}
${doc.Tahun || ''}
${doc.Bulan || ''}
${doc.Tanggal || ''}

`
.toLowerCase()

const textWords =
fullText.match(/\b[\w]+\b/g) || []

return searchWords.every(word =>
textWords.includes(word)
)

})

setResults(filtered)

}

return(

<div className="
min-h-screen
bg-[#f5f5f5]
pb-24
font-sans
">

{/* HEADER */}

<header className="
bg-white
border-b
border-gray-200
sticky
top-0
z-50
shadow-sm
">

<div className="
max-w-7xl
mx-auto
px-5
md:px-8
py-4
flex
items-center
">

<div className="
flex
items-center
gap-4
">

<img
src="https://i.imgur.com/pzIV8If.png"
className="
w-14
h-14
md:w-16
md:h-16
object-contain
"
/>

<div>

<h1 className="
text-[22px]
md:text-[34px]
font-black
tracking-tight
text-red-700
leading-none
">

PT TUNAS JAYA SANUR (GROUP)

</h1>

<p className="
text-black
text-[12px]
md:text-[16px]
font-semibold
mt-2
tracking-wide
">

Departemen General Affair

</p>

</div>

</div>

</div>

</header>

{/* HERO */}

<section className="
max-w-7xl
mx-auto
px-5
md:px-8
pt-14
md:pt-24
pb-20
">

<h2 className="
text-[52px]
md:text-[110px]
font-black
leading-[0.92]
tracking-[-3px]
text-[#0b132b]
mb-10
max-w-6xl
">

Cari Arsip Digital

</h2>

{/* SEARCH */}

<div className="
relative
mb-16
">

<input
type="text"
value={search}
placeholder="Cari dokumen..."
onChange={(e)=>{

setSearch(e.target.value)

if(e.target.value===''){

setResults([])

}

}}
onKeyDown={(e)=>{

if(e.key === 'Enter'){

handleSearch()

}

}}
className="
w-full
h-24
md:h-28
bg-white
rounded-[32px]
md:rounded-[40px]
pl-8
pr-36
text-xl
md:text-2xl
font-semibold
shadow-xl
outline-none
border
border-gray-100
"
/>

<button
onClick={handleSearch}
className="
absolute
right-3
top-1/2
-translate-y-1/2
bg-red-700
hover:bg-red-800
transition-all
text-white
font-black
px-8
md:px-10
h-16
md:h-20
rounded-[24px]
md:rounded-[28px]
text-lg
md:text-xl
shadow-lg
">

ENTER

</button>

</div>

{/* LOADING */}

{
loading && (

<div className="
text-lg
text-gray-500
font-medium
">

Menghubungkan database...

</div>

)
}

{/* RESULT */}

<div className="
grid
gap-5
">

{

results.length > 0 ? (

results.map((item,index)=>(

<div
key={index}
className="
group
bg-white
rounded-[28px]
md:rounded-[36px]
p-6
md:p-8
shadow-xl
hover:shadow-2xl
transition-all
duration-300
border
border-gray-100
">

<div className="
flex
flex-col
md:flex-row
md:items-center
justify-between
gap-8
">

<div className="flex-1">

<div className="
flex
items-start
gap-4
mb-5
">

<div className="
min-w-[56px]
h-14
rounded-2xl
bg-red-700
text-white
flex
items-center
justify-center
text-2xl
shadow-lg
">

📄

</div>

<div>

<h3 className="
text-[26px]
md:text-[42px]
font-black
leading-[1.05]
tracking-tight
text-[#0b132b]
">

{item.Nama}

</h3>

<p className="
text-gray-400
font-medium
mt-2
text-sm
md:text-base
">

Dokumen Arsip Perusahaan

</p>

</div>

</div>

<div className="
flex
flex-wrap
gap-3
">

<div className="
bg-red-50
text-red-700
px-4
py-2
rounded-2xl
font-bold
text-sm
">

{item.Kategori}

</div>

<div className="
bg-gray-100
text-gray-700
px-4
py-2
rounded-2xl
font-bold
text-sm
">

{item.Tipe}

</div>

<div className="
bg-gray-100
text-gray-700
px-4
py-2
rounded-2xl
font-bold
text-sm
">

{item.Tahun}

</div>

<div className="
bg-gray-100
text-gray-700
px-4
py-2
rounded-2xl
font-bold
text-sm
">

{item.Bulan}

</div>

</div>

</div>

<a
href={item.Link}
target="_blank"
className="
bg-red-700
hover:bg-red-800
transition-all
text-white
font-black
px-8
h-16
rounded-2xl
flex
items-center
justify-center
whitespace-nowrap
shadow-lg
group-hover:scale-105
text-lg
">

Buka File

</a>

</div>

</div>

))

) : (

!loading &&
search !== '' && (

<div className="
bg-white
rounded-[36px]
p-14
md:p-20
text-center
shadow-xl
border
border-gray-100
">

<div className="
text-7xl
md:text-8xl
mb-8
">

📂

</div>

<h3 className="
text-4xl
md:text-5xl
font-black
text-[#0b132b]
mb-5
tracking-tight
">

Dokumen Tidak Ditemukan

</h3>

<p className="
text-lg
md:text-2xl
text-gray-500
leading-relaxed
font-medium
">

Coba gunakan keyword yang lebih spesifik

</p>

</div>

)

)

}

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
overflow-hidden
shadow-2xl
">

<marquee
behavior="scroll"
direction="left"
scrollamount="7"
className="
font-bold
text-sm
md:text-lg
">

Info lebih lanjut hubungi :

<a
href="https://wa.me/62881037378266"
target="_blank"
className="
inline-flex
items-center
ml-4
font-black
">

<img
src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
className="
w-5
h-5
md:w-6
md:h-6
mr-2
"
/>

0881037378266 - I Kadek Pratiwa Suarnata (Petugas Arsip)

</a>

</marquee>

</div>

</div>

)

}