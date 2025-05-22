import ExamResultsLookup from "@/components/exam-results-lookup"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#123363]">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center py-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Xanh%202-RD12nlIOt5HH3ZQWV9jqD9lA0An1a7.png"
            alt="Gia Dinh University Logo"
            width={120}
            height={120}
            className="mb-6"
            priority
          />
          <h1 className="text-3xl font-bold text-center mb-2 text-[#bea258]">Tra cứu kết quả thi</h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl">
            Đánh giá năng lực ngoại ngữ đầu vào dự tuyển trình độ thạc sĩ - Trường Đại học Gia Định
          </p>
        </div>
        <ExamResultsLookup />

        <div className="mt-8 text-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Trường Đại học Gia Định. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </main>
  )
}
