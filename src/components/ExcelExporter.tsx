import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

type Column = string | { title: string; dataIndex?: string };

/**

 * @param columns 
 * @param data 
 * @param fileName 
 * @param headingTitle 
 */
export async function exportTableToExcel(
  columns: Column[],
  data: Record<string, any>[],
  fileName: string = "report",
  headingTitle?: string
): Promise<void> {
  const headerTitles = columns.map((c) => (typeof c === "string" ? c : c.title));
  const headerKeys = columns.map((c) =>
    typeof c === "string" ? c : c.dataIndex ?? c.title
  );

const dataRows = data.map((row, rowIdx) =>
  headerKeys.map((key) => {
    if (key === "index") return rowIdx + 1;

    const val = row?.[key];
    if (typeof val === "number" && !Number.isSafeInteger(val)) return String(val);
    if (val instanceof Date) return val.toLocaleString();
    return val ?? "";
  })
);


  const nCols = headerTitles.length || 1;

  // --- INITIAL SHEET CONTENT (no heading yet, we’ll style manually) ---
  const worksheetData: (string | number | boolean | null)[][] = [
    ...(headingTitle ? [[], [headingTitle, ...Array(nCols - 1).fill("")], []] : []),
    headerTitles,
    ...dataRows,
  ];

  const ws = XLSX.utils.aoa_to_sheet(worksheetData);

  // --- STYLE MAIN HEADING WITH TOP & BOTTOM SPACE ---
  if (headingTitle) {
    ws["!merges"] = ws["!merges"] || [];
    const headingRowIndex = 1; 
    const totalCols = nCols - 1;

    ws["!merges"].push({
      s: { r: headingRowIndex, c: 0 },
      e: { r: headingRowIndex, c: totalCols },
    });

    const headingAddr = XLSX.utils.encode_cell({ r: headingRowIndex, c: 0 });
    ws[headingAddr] = {
      t: "s",
      v: headingTitle,
      s: {
        font: { bold: true, sz: 22, color: { rgb: "854707" } },
        alignment: {
          horizontal: "center",
          vertical: "center",
          wrapText: true,
        },
        fill: { patternType: "solid", fgColor: { rgb: "ffdab3" } }, // Dark Orange
      },
    };

  
    ws["!rows"] = [
      { hpt: 15 }, 
      { hpt: 40 }, 
      { hpt: 15 }, 
    ];
  }

  // --- STYLE COLUMN HEADERS ---
  const headerRowIndex = headingTitle ? 3 : 0; 
  headerTitles.forEach((title, i) => {
    const addr = XLSX.utils.encode_cell({ r: headerRowIndex, c: i });
    ws[addr] = {
      t: "s",
      v: title,
      s: {
        font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
        fill: { patternType: "solid", fgColor: { rgb: "FF9933" } }, // Medium Orange
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        border: {
          top: { style: "medium", color: { rgb: "FF8C00" } },
          bottom: { style: "medium", color: { rgb: "FF8C00" } },
          left: { style: "thin", color: { rgb: "FF8C00" } },
          right: { style: "thin", color: { rgb: "FF8C00" } },
        },
      },
    };
  });

  // --- STYLE DATA CELLS WITH ALTERNATING ROWS ---
  dataRows.forEach((row, rowIdx) => {
    const isEvenRow = rowIdx % 2 === 0;
    const rowBgColor = isEvenRow ? "FFFFFF" : "FFF4E6"; // White and Light Orange shade
    
    row.forEach((cellVal, colIdx) => {
      const addr = XLSX.utils.encode_cell({
        r: headerRowIndex + 1 + rowIdx,
        c: colIdx,
      });
      ws[addr] = {
        t: "s",
        v: cellVal,
        s: {
          font: { sz: 10, color: { rgb: "333333" } },
          fill: { patternType: "solid", fgColor: { rgb: rowBgColor } },
          alignment: { horizontal: "center", vertical: "center", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "FFD4A3" } },
            bottom: { style: "thin", color: { rgb: "FFD4A3" } },
            left: { style: "thin", color: { rgb: "FFD4A3" } },
            right: { style: "thin", color: { rgb: "FFD4A3" } },
          },
        },
      };
    });
  });

  // --- AUTO COLUMN WIDTH ---
  const colWidths = headerTitles.map((t, i) => {
    const maxLen = Math.max(
      t?.toString().length || 10,
      ...data.map((r) => (r?.[headerKeys[i]]?.toString?.()?.length ?? 0))
    );
    return { wch: Math.min(Math.max(maxLen, 12), 50) };
  });
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, fileName.substring(0, 31));

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
}

export default exportTableToExcel;
