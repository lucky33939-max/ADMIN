Dưới đây là **bộ code mẫu giao diện** cho:

- **Trang chủ**
- **Trang đăng nhập**
- **Dashboard nội bộ**
- **Danh sách bot**
- **Chi tiết bot / quản lý bot**

Mình dùng:

- **Next.js**
- **Tailwind CSS**
- **lucide-react** để có icon đẹp

Đây là **UI mẫu**, chưa nối backend.

---

# 1) Tạo project

```bash
npx create-next-app@latest bot-admin-ui
cd bot-admin-ui
npm install lucide-react
```

Khi tạo project:
- chọn **TypeScript**: Yes
- chọn **Tailwind**: Yes
- chọn **App Router**: Yes

---

# 2) Cấu trúc thư mục

```bash
app/
  layout.tsx
  globals.css
  page.tsx
  login/
    page.tsx
  dashboard/
    page.tsx
  bots/
    page.tsx
    [id]/
      page.tsx

components/
  Sidebar.tsx
  Topbar.tsx
  StatCard.tsx
  BotDetailTabs.tsx
```

---

# 3) Code

---

## `app/layout.tsx`

```tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bot Admin UI",
  description: "Giao diện quản lý bot nội bộ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
```

---

## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

:root {
  --primary: #2563eb;
  --secondary: #7c3aed;
}
```

---

## `components/Sidebar.tsx`

```tsx
import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Database,
  Plug,
  BarChart3,
  Users,
  Settings,
  FileText,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Bots", href: "/bots", icon: Bot },
  { name: "Conversations", href: "#", icon: MessageSquare },
  { name: "Knowledge Base", href: "#", icon: Database },
  { name: "Integrations", href: "#", icon: Plug },
  { name: "Analytics", href: "#", icon: BarChart3 },
  { name: "Users", href: "#", icon: Users },
  { name: "Logs", href: "#", icon: FileText },
  { name: "Settings", href: "#", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-slate-950 text-white min-h-screen border-r border-slate-800">
      <div className="px-6 py-5 border-b border-slate-800">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Bot<span className="text-blue-400">Hub</span>
        </Link>
        <p className="text-xs text-slate-400 mt-1">Internal Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-sm font-semibold">Workspace</p>
          <p className="text-xs text-slate-400 mt-1">Phòng CSKH - Prod</p>
        </div>
      </div>
    </aside>
  );
}
```

---

## `components/Topbar.tsx`

```tsx
import { Bell, Search, ChevronDown } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">Quản lý và giám sát bot AI</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 w-72">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Tìm bot, hội thoại..."
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        <button className="relative rounded-xl border border-slate-200 bg-white p-2 hover:bg-slate-50">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-slate-500">admin@company.vn</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
```

---

## `components/StatCard.tsx`

```tsx
export default function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <span className="text-xs font-medium text-emerald-600">{change}</span>
      </div>
    </div>
  );
}
```

---

## `components/BotDetailTabs.tsx`

```tsx
"use client";

import { useState } from "react";

const tabs = [
  "Overview",
  "Prompt",
  "Knowledge Base",
  "Channels",
  "Testing",
  "Versions",
  "Logs",
];

export default function BotDetailTabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "Overview" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Tên bot</p>
              <p className="mt-1 font-semibold">Sales Assistant Bot</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Trạng thái</p>
              <p className="mt-1 font-semibold text-emerald-600">Đang hoạt động</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 md:col-span-2">
              <p className="text-sm text-slate-500">Mô tả</p>
              <p className="mt-1 text-sm text-slate-700">
                Bot hỗ trợ tư vấn sản phẩm, lọc nhu cầu khách hàng và chuyển
                lead sang bộ phận kinh doanh.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Prompt" && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">System Prompt</label>
              <textarea
                rows={8}
                defaultValue={`Bạn là một trợ lý AI hỗ trợ tư vấn khách hàng. 
Trả lời ngắn gọn, lịch sự, dễ hiểu. 
Nếu không có dữ liệu, hãy xin phép chuyển sang nhân viên hỗ trợ.`}
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Temperature</label>
                <input
                  defaultValue="0.7"
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Max Tokens</label>
                <input
                  defaultValue="1024"
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Ngôn ngữ</label>
                <select className="w-full rounded-xl border border-slate-300 p-3 outline-none">
                  <option>Tiếng Việt</option>
                  <option>English</option>
                </select>
              </div>
            </div>

            <button className="rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700">
              Lưu cấu hình
            </button>
          </div>
        )}

        {activeTab === "Knowledge Base" && (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">
              <p className="font-semibold">Kéo thả file vào đây</p>
              <p className="text-sm text-slate-500 mt-1">Hỗ trợ PDF, DOCX, TXT, CSV</p>
              <button className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white">
                Chọn tài liệu
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3">Tên tài liệu</th>
                    <th className="px-4 py-3">Loại</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3">Chunks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">bang-gia-san-pham.pdf</td>
                    <td className="px-4 py-3">PDF</td>
                    <td className="px-4 py-3 text-emerald-600">Indexed</td>
                    <td className="px-4 py-3">124</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">faq.txt</td>
                    <td className="px-4 py-3">TXT</td>
                    <td className="px-4 py-3 text-amber-600">Processing</td>
                    <td className="px-4 py-3">32</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Channels" && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {["Website Widget", "Facebook", "Telegram", "Zalo OA"].map((channel) => (
              <div key={channel} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold">{channel}</p>
                <p className="mt-1 text-sm text-slate-500">Kết nối và cấu hình webhook</p>
                <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm">
                  Cấu hình
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Testing" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold">Test Playground</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-slate-100 p-3 text-sm">
                  Khách hàng: Giá gói premium bao nhiêu?
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-sm">
                  Bot: Gói Premium hiện tại có giá từ 2.000.000đ/tháng...
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  placeholder="Nhập câu hỏi để test..."
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none"
                />
                <button className="rounded-xl bg-blue-600 px-5 py-3 text-white">
                  Gửi
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold">Thông tin phản hồi</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-lg bg-slate-50 p-3">
                  <span className="font-medium">Confidence:</span> 92%
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <span className="font-medium">Nguồn dữ liệu:</span> bang-gia-san-pham.pdf
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <span className="font-medium">Latency:</span> 1.2s
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Versions" && (
          <div className="space-y-3">
            {["v1.0 - Initial", "v1.1 - Update prompt", "v1.2 - Add pricing docs"].map(
              (version) => (
                <div
                  key={version}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-medium">{version}</p>
                    <p className="text-sm text-slate-500">Cập nhật bởi Admin</p>
                  </div>
                  <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">
                    Rollback
                  </button>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === "Logs" && (
          <div className="space-y-3">
            {[
              "10:12 - Prompt updated by Admin",
              "09:45 - New document uploaded",
              "08:30 - Website widget connected",
            ].map((log) => (
              <div key={log} className="rounded-xl border border-slate-200 p-4 text-sm">
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## `app/page.tsx` — Trang chủ

```tsx
import Link from "next/link";
import { Bot, BarChart3, MessageSquare, ShieldCheck, Cpu, Plug } from "lucide-react";

const features = [
  {
    title: "Quản lý nhiều bot",
    desc: "Tạo và quản lý nhiều bot cho nhiều phòng ban trên cùng một hệ thống.",
    icon: Bot,
  },
  {
    title: "Theo dõi hội thoại",
    desc: "Xem realtime chat, chất lượng trả lời và trạng thái handover.",
    icon: MessageSquare,
  },
  {
    title: "Phân tích hiệu suất",
    desc: "Thống kê lượt chat, CSAT, lỗi hệ thống và chi phí sử dụng mô hình.",
    icon: BarChart3,
  },
  {
    title: "Quản trị an toàn",
    desc: "Phân quyền người dùng, audit log và cấu hình bảo mật rõ ràng.",
    icon: ShieldCheck,
  },
  {
    title: "Tối ưu AI",
    desc: "Cấu hình prompt, knowledge base, versioning và test bot nhanh.",
    icon: Cpu,
  },
  {
    title: "Kết nối đa kênh",
    desc: "Website, Facebook, Telegram, Zalo, API webhook.",
    icon: Plug,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold">
            Bot<span className="text-blue-600">Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Tính năng</a>
            <a href="#pricing" className="hover:text-slate-900">Bảng giá</a>
            <a href="#demo" className="hover:text-slate-900">Demo</a>
            <a href="#contact" className="hover:text-slate-900">Liên hệ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Đăng nhập
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Vào hệ thống
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Nền tảng quản lý bot AI cho doanh nghiệp
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Xây dựng, triển khai và quản lý bot AI tập trung
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Tạo bot cho chăm sóc khách hàng, bán hàng và nội bộ doanh nghiệp.
              Theo dõi hiệu suất, cấu hình dữ liệu, kết nối đa kênh trong một dashboard duy nhất.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Dùng thử ngay
              </Link>
              <a
                href="#demo"
                className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50"
              >
                Xem demo
              </a>
            </div>

            <div className="mt-8 flex gap-8 text-sm text-slate-500">
              <div>
                <p className="text-2xl font-bold text-slate-900">120+</p>
                <p>Bot đang hoạt động</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2M+</p>
                <p>Tin nhắn xử lý</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">99.9%</p>
                <p>Uptime</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-100">
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Bot Dashboard Preview</p>
                  <p className="text-sm text-slate-400">Realtime monitoring</p>
                </div>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                  Active
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Conversations</p>
                  <p className="mt-2 text-2xl font-bold">8,420</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Success Rate</p>
                  <p className="mt-2 text-2xl font-bold">94.2%</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Avg Response</p>
                  <p className="mt-2 text-2xl font-bold">1.3s</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Escalation</p>
                  <p className="mt-2 text-2xl font-bold">12%</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Top Bot</p>
                <div className="mt-3 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Sales Assistant</span>
                    <span>2,312 chats</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Support Bot</span>
                    <span>1,845 chats</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>HR Internal Bot</span>
                    <span>786 chats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Tính năng
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Tất cả công cụ để vận hành bot AI hiệu quả
          </h2>
          <p className="mt-4 text-slate-600">
            Thiết kế cho đội vận hành, CSKH, kinh doanh và quản trị hệ thống.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="demo" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Demo
            </p>
            <h2 className="mt-3 text-3xl font-bold">Trải nghiệm bot trực tiếp</h2>
            <p className="mt-4 text-slate-600">
              Tích hợp widget chat vào website và theo dõi phản hồi theo thời gian thực.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-2xl bg-slate-100 p-4">
              <div className="space-y-3">
                <div className="max-w-xs rounded-2xl bg-white p-3 text-sm shadow-sm">
                  Xin chào, tôi muốn tìm gói dịch vụ phù hợp cho doanh nghiệp 50 nhân sự.
                </div>
                <div className="ml-auto max-w-xs rounded-2xl bg-blue-600 p-3 text-sm text-white">
                  Chào anh/chị, với quy mô 50 nhân sự, em đề xuất gói Business...
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none"
                  placeholder="Nhập nội dung..."
                />
                <button className="rounded-xl bg-blue-600 px-5 py-3 text-white">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Bảng giá
          </p>
          <h2 className="mt-3 text-3xl font-bold">Gói phù hợp cho mọi quy mô</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "499K",
              desc: "Dành cho nhóm nhỏ, thử nghiệm bot cơ bản",
            },
            {
              name: "Business",
              price: "2.000K",
              desc: "Dành cho doanh nghiệp cần quản lý nhiều bot",
            },
            {
              name: "Enterprise",
              price: "Liên hệ",
              desc: "Tùy chỉnh riêng, bảo mật và tích hợp nâng cao",
            },
          ].map((plan, idx) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 ${
                idx === 1
                  ? "border-blue-600 bg-blue-600 text-white shadow-xl"
                  : "border-slate-200 bg-white"
              }`}
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className={`mt-2 text-sm ${idx === 1 ? "text-blue-100" : "text-slate-500"}`}>
                {plan.desc}
              </p>
              <p className="mt-6 text-4xl font-extrabold">{plan.price}</p>
              <button
                className={`mt-8 w-full rounded-2xl px-4 py-3 font-semibold ${
                  idx === 1
                    ? "bg-white text-blue-600"
                    : "bg-slate-900 text-white"
                }`}
              >
                Chọn gói
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-xl font-bold">
              Bot<span className="text-blue-600">Hub</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Nền tảng quản lý bot AI cho doanh nghiệp
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <p>Email: support@bothub.vn</p>
            <p>Hotline: 0900 000 000</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
```

---

## `app/login/page.tsx`

```tsx
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between bg-slate-950 p-10 text-white">
          <div>
            <Link href="/" className="text-2xl font-bold">
              Bot<span className="text-blue-400">Hub</span>
            </Link>
            <h2 className="mt-10 text-4xl font-bold leading-tight">
              Đăng nhập vào hệ thống quản lý bot
            </h2>
            <p className="mt-4 text-slate-300">
              Theo dõi bot, hội thoại, dữ liệu và báo cáo trên một dashboard tập trung.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Hôm nay</p>
            <p className="mt-2 text-3xl font-bold">1,284 hội thoại</p>
            <p className="mt-2 text-sm text-emerald-400">+12.5% so với hôm qua</p>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-slate-900">Chào mừng trở lại</h1>
            <p className="mt-2 text-slate-500">
              Nhập thông tin tài khoản để tiếp tục
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@company.vn"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" />
                  Ghi nhớ đăng nhập
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>

              <Link
                href="/dashboard"
                className="block w-full rounded-2xl bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Đăng nhập
              </Link>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Chưa có tài khoản?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Liên hệ quản trị viên
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## `app/dashboard/page.tsx`

```tsx
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1">
        <Topbar title="Dashboard" />

        <div className="p-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Tổng số bot" value="24" change="+2 tháng này" />
            <StatCard title="Hội thoại hôm nay" value="1,284" change="+12.5%" />
            <StatCard title="Tỷ lệ thành công" value="94.2%" change="+1.8%" />
            <StatCard title="Escalation Rate" value="11.6%" change="-2.1%" />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Biểu đồ hội thoại</h2>
                  <p className="text-sm text-slate-500">7 ngày gần nhất</p>
                </div>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">
                  Xuất báo cáo
                </button>
              </div>

              <div className="mt-6 h-72 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-dashed border-blue-200 flex items-center justify-center text-slate-400">
                Khu vực biểu đồ
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">Top Bot hoạt động</h2>
              <div className="mt-5 space-y-4">
                {[
                  ["Sales Assistant", "2,312 chats", "Ổn định"],
                  ["Support Bot", "1,845 chats", "Cao"],
                  ["HR Bot", "786 chats", "Tốt"],
                  ["FAQ Bot", "510 chats", "Ổn định"],
                ].map(([name, chats, status]) => (
                  <div key={name} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-slate-500">{chats}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">Câu hỏi phổ biến</h2>
              <div className="mt-5 space-y-3">
                {[
                  "Giá gói Business là bao nhiêu?",
                  "Làm sao tích hợp bot vào website?",
                  "Có dùng được với Zalo không?",
                  "Bot có lưu lịch sử hội thoại không?",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 p-4 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">Hoạt động gần đây</h2>
              <div className="mt-5 space-y-4">
                {[
                  "Admin đã cập nhật prompt cho Sales Assistant",
                  "Bot Support kết nối thành công Telegram",
                  "Tài liệu faq.pdf đã được index",
                  "Bot HR được publish lên production",
                ].map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## `app/bots/page.tsx`

```tsx
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const bots = [
  {
    id: "sales-assistant",
    name: "Sales Assistant",
    desc: "Bot tư vấn sản phẩm và thu lead",
    status: "Active",
    channel: "Website, Facebook",
    model: "GPT-4o-mini",
    owner: "Nguyễn Minh",
  },
  {
    id: "support-bot",
    name: "Support Bot",
    desc: "Bot CSKH và xử lý câu hỏi thường gặp",
    status: "Active",
    channel: "Website, Telegram",
    model: "Claude / GPT",
    owner: "Trần Anh",
  },
  {
    id: "hr-internal",
    name: "HR Internal Bot",
    desc: "Bot hỏi đáp quy trình nội bộ nhân sự",
    status: "Draft",
    channel: "Slack",
    model: "GPT-4o-mini",
    owner: "Lê Thảo",
  },
];

export default function BotsPage() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1">
        <Topbar title="Bot Management" />

        <div className="p-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-5">
              <input
                placeholder="Tìm theo tên bot..."
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
              />
              <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none">
                <option>Trạng thái</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Paused</option>
              </select>
              <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none">
                <option>Kênh tích hợp</option>
                <option>Website</option>
                <option>Facebook</option>
                <option>Telegram</option>
                <option>Zalo</option>
              </select>
              <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none">
                <option>Mô hình AI</option>
                <option>GPT-4o-mini</option>
                <option>Claude</option>
              </select>
              <button className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
                + Tạo bot mới
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-5 py-4">Tên bot</th>
                  <th className="px-5 py-4">Mô tả</th>
                  <th className="px-5 py-4">Trạng thái</th>
                  <th className="px-5 py-4">Kênh</th>
                  <th className="px-5 py-4">Model</th>
                  <th className="px-5 py-4">Phụ trách</th>
                  <th className="px-5 py-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {bots.map((bot) => (
                  <tr key={bot.id} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-slate-900">{bot.name}</td>
                    <td className="px-5 py-4 text-slate-600">{bot.desc}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          bot.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {bot.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{bot.channel}</td>
                    <td className="px-5 py-4 text-slate-600">{bot.model}</td>
                    <td className="px-5 py-4 text-slate-600">{bot.owner}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/bots/${bot.id}`}
                          className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
                        >
                          Xem
                        </Link>
                        <button className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50">
                          Tạm dừng
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## `app/bots/[id]/page.tsx`

```tsx
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import BotDetailTabs from "@/components/BotDetailTabs";

export default function BotDetailPage() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1">
        <Topbar title="Chi tiết bot" />

        <div className="p-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  S
                </div>

                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold">Sales Assistant Bot</h2>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      Active
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Production
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Bot tư vấn khách hàng, lọc nhu cầu và chuyển lead về CRM
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-50">
                  Save Draft
                </button>
                <button className="rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600">
                  Pause
                </button>
                <button className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Publish
                </button>
              </div>
            </div>
          </div>

          <BotDetailTabs />
        </div>
      </div>
    </main>
  );
}
```

---

# 4) Chạy project

```bash
npm run dev
```

Mở:

- Trang chủ: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`
- Bots: `http://localhost:3000/bots`
- Bot detail: `http://localhost:3000/bots/sales-assistant`

---

# 5) Giao diện này đã có gì?

## Public
- Trang chủ giới thiệu sản phẩm
- Hero, tính năng, demo, bảng giá, footer

## Internal
- Sidebar quản trị
- Dashboard KPI
- Danh sách bot
- Trang chi tiết bot
- Các tab:
  - Overview
  - Prompt
  - Knowledge Base
  - Channels
  - Testing
  - Versions
  - Logs

---

# 6) Nếu bạn muốn đẹp hơn nữa

Mình có thể viết tiếp cho bạn các phần sau:

### A. Bản nâng cấp UI chuyên nghiệp hơn
- responsive đẹp hơn
- dark mode
- table nâng cao
- card animation
- layout chuẩn SaaS

### B. Thêm trang quản trị đầy đủ
- Conversations
- Analytics
- User & Role
- Settings
- Audit Logs

### C. Nối backend thật
- API CRUD bot
- login JWT
- upload knowledge base
- websocket chat realtime

---

# 7) Mình có thể làm tiếp ngay cho bạn

Nếu muốn, tin nhắn tiếp theo mình có thể viết thêm một trong các gói sau:

### Gói 1:
**“Viết tiếp giao diện Conversations + Analytics + Users”**

### Gói 2:
**“Nâng cấp code này thành admin layout chuyên nghiệp hơn”**

### Gói 3:
**“Viết backend NestJS/API cho bộ giao diện này”**

### Gói 4:
**“Đóng gói toàn bộ thành project hoàn chỉnh có copy-paste chạy được”**

Nếu muốn, mình có thể **viết tiếp ngay full bộ code cho Conversations + Analytics + Users + Settings** trong tin nhắn sau.
