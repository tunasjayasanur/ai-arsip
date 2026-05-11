export async function getGoogleSheetData(){

const SHEET_ID =
'1AGvxt1mzyvvZWFu6h6iCNMfSoM6N8g_cCGi3bb2cmo8'

const SHEET_NAME =
'DATA'

const url =
`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`

try{

const response =
await fetch(url,{
cache:'no-store'
})

if(!response.ok){

throw new Error(
'Gagal mengambil data Google Sheet'
)

}

const data =
await response.json()

return data

}catch(error){

console.log(
'ERROR GOOGLE SHEET:',
error
)

return []

}

}