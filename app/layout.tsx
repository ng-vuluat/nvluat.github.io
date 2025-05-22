import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tra cứu kết quả thi - Trường Đại học Gia Định',
  description: 'Hệ thống tra cứu kết quả thi đánh giá năng lực ngoại ngữ đầu vào dự tuyển trình độ thạc sĩ',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
