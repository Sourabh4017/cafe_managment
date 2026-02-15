// "use client";

// import QRCode from "qrcode";
// import { useState } from "react";

// export default function QRGenerator() {
//   const [table, setTable] = useState("");
//   const [qr, setQr] = useState("");

//   const generateQR = async () => {
//     if (!table) return alert("Enter table number");

//     const url = `${window.location.origin}/?table=${table}`;
//     const qrData = await QRCode.toDataURL(url);
//     setQr(qrData);
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Generate Table QR</h1>

//       <input
//         placeholder="Table No (C4)"
//         value={table}
//         onChange={(e) => setTable(e.target.value)}
//       />

//       <button onClick={generateQR}>Generate QR</button>

//       {qr && (
//         <div>
//           <img src={qr} />
//           <p>{table}</p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const [tableNo, setTableNo] = useState("");

  const url =
    tableNo &&
    `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/tablet?table=${tableNo}`;

  return (
    <div style={{ padding: "40px" }}>
      <h1>QR Generator</h1>

      <input
        type="number"
        placeholder="Enter Table Number"
        value={tableNo}
        onChange={(e) => setTableNo(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px" }}
      />

      {url && (
        <div>
          <QRCodeCanvas value={url} size={200} />
          <p style={{ marginTop: "10px" }}>{url}</p>
        </div>
      )}
    </div>
  );
}