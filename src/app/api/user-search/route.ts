import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "กรุณาระบุชื่อผู้ใช้ไฟ" },
      { status: 400 }
    );
  }

  try {
    const excelPath = path.join(
      process.cwd(),
      "public",
      "tampering_normal 2019-2025.xlsx"
    );
    await fs.access(excelPath); // ตรวจสอบว่าไฟล์มีอยู่
    const fileBuffer = await fs.readFile(excelPath);

    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json<any>(worksheet);

    const found = data.find(
      (row) => row["Cust. Name"]?.toString().trim() === name.trim()
    );

    if (!found) {
      return NextResponse.json(
        { error: "ไม่พบชื่อผู้ใช้ไฟในข้อมูล" },
        { status: 404 }
      );
    }

    console.log("เจอข้อมูล:", found); // 🔍 log ออกมาก่อนตามที่คุณต้องการ

    return NextResponse.json({ user: found });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    return NextResponse.json(
      { error: "ไม่สามารถโหลดข้อมูลจากไฟล์ได้" },
      { status: 500 }
    );
  }
}
