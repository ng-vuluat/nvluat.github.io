"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Search, AlertCircle, Info } from "lucide-react"

interface ExamResult {
  sbd: string
  HoVaTen: string
  NgaySinh: string
  NoiSinh: string
  DiemDocViet: number
  DiemNghe: number
  DiemNoi: number
  DiemTong: number
  KetQua: string
  NamTS: number
  DotTS: number
}

export default function ExamResultsLookup() {
  const [sbd, setSbd] = useState("")
  const [result, setResult] = useState<ExamResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const cleanSbd = sbd.replace(/\D/g, "")
    if (!cleanSbd) {
      setError("Vui lòng nhập số báo danh")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(`/api/exam-results?sbd=${cleanSbd}`)

      if (!response.ok) {
        throw new Error("Không tìm thấy kết quả")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Không tìm thấy kết quả với số báo danh này")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/95 backdrop-blur shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-[#123363]">Nhập thông tin tra cứu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-3 rounded-md mb-4 text-sm text-[#123363] flex items-start gap-2">
            <Info className="h-5 w-5 text-[#123363] mt-0.5 flex-shrink-0" />
            <p>
              Nhập Số báo danh của anh/chị để tra cứu kết quả (7 chữ số).
              <br />
              Ví dụ: 2412345
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={sbd}
                onChange={(e) => {
                  // Allow only digits
                  const value = e.target.value.replace(/[^\d]/g, "")
                  setSbd(value)
                }}
                placeholder="Nhập số báo danh (VD: 2501016)"
                required
                className="pl-10 bg-white border-[#123363] focus:ring-[#bea258] focus:border-[#bea258]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#bea258] hover:bg-[#123363] transition-colors"
            >
              {loading ? "Đang tìm..." : "Tra cứu"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#123363] mb-4">Kết quả tra cứu</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Số báo danh</TableCell>
                    <TableCell>{result.sbd}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Họ và tên</TableCell>
                    <TableCell>{result.HoVaTen}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Ngày sinh</TableCell>
                    <TableCell>{result.NgaySinh}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Nơi sinh</TableCell>
                    <TableCell>{result.NoiSinh}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Điểm đọc viết</TableCell>
                    <TableCell>{result.DiemDocViet}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Điểm nghe</TableCell>
                    <TableCell>{result.DiemNghe}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Điểm nói</TableCell>
                    <TableCell>{result.DiemNoi}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Điểm tổng</TableCell>
                    <TableCell className="font-semibold">{result.DiemTong}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Kết quả</TableCell>
                    <TableCell
                      className={
                        result.KetQua === "Đạt" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                      }
                    >
                      {result.KetQua}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Năm tuyển sinh</TableCell>
                    <TableCell>{result.NamTS}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[#123363]">Đợt tuyển sinh</TableCell>
                    <TableCell>{result.DotTS}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
