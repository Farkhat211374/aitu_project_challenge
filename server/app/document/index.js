module.exports = ({first_name,last_name,middle_name,salary,job_title,doh}) => {
    const today = new Date();
   return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
            .underline{
            text-decoration: underline;
            }
            .header {
               position: relative;
             }
             
             .header p {
               margin: 0;
             }
             
             .overlay-image {
               position: absolute;
               top: -30px;
               left: 150px;
               max-width: 156px;
               width: 100%;
               height: auto;
               pointer-events: none;
             }
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                      <br />
                      <br />
                         <tr>
                            <td class="title"><img  src="https://static.tildacdn.com/tild3764-6633-4663-b138-303730646233/aitu-logo__2.png"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               ДАТА: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
             </table>
             <br />
             <br />
             <h1 class="justify-center">СПРАВКА</h1>
             <div class="content">
               <p>Справка выдана о том, что <span class="underline">${last_name} ${first_name} ${middle_name}  </span> действительно работает в агенстве по финансовому мониторингу Республики Казахстан в должности <span class="underline">${job_title} с ${doh} </span>. по настоящее время, и ежемесячная заработная плата составляет <span class="underline">${salary} тенге </span>. На время туристической поездки сохраняется рабочее место и оклад.</p>
               <p>Справка выдана по месту требования.</p>
             </div>
             <br />
             <div class="header">
             <p>Генеральный директор: Сагат Ф.И.</p>
             <img src="https://pro-stamp.kz/d/triv_odnom.png" alt="Изображение" class="overlay-image">
           </div>
           
          </div>
       </body>
    </html>
    `;
};