# Smart Care System

React Native app สำหรับแจ้งปัญหาและขอความช่วยเหลือภายในสำนักงาน — 4 หน้า: Login → Main → Add Request → Request Detail

รายละเอียดสเปค/decisions ทั้งหมดอยู่ใน [PLAN.md](./PLAN.md) และ [CLAUDE.md](./CLAUDE.md)

## Tech Stack

React Native (CLI) + TypeScript · react-navigation (Stack) · react-hook-form + Zod · Redux Toolkit + redux-persist · Jest + React Native Testing Library · pnpm · ESLint + Prettier

## Setup

```bash
pnpm install
```

> โปรเจกต์นี้ต้อง pin `node-linker=hoisted` ใน `.npmrc` (มีมาให้แล้ว) — React Native's Metro bundler และ Jest ยังไม่รองรับ pnpm's default symlinked `node_modules/.pnpm` layout ได้เต็มที่

รัน:

```bash
pnpm start        # Metro bundler
pnpm android       # ต้องมี Android emulator/device + Android SDK
pnpm ios           # ต้องมี Xcode + CocoaPods (bundle install && bundle exec pod install ใน ios/ ครั้งแรก)
```

ทดสอบ/ตรวจสอบ:

```bash
pnpm test
pnpm lint
```

## Decisions ที่ตัดสินใจเอง (ไม่ตรงกับสเปคเป๊ะ)

สเปค/wireframe เดิมไม่ได้ระบุ 2 จุดนี้ชัดเจน — ตัดสินใจเองระหว่าง implement ตาม [PLAN.md](./PLAN.md#5-open-decisions-already-made-ไม่ตรงกับสเปคเป๊ะ-แต่-confirm-แล้วโดยผู้สมัคร):

1. **Add Request submit สำเร็จ → navigate กลับ Main** (ไม่ใช่ไป Request Detail ของรายการที่เพิ่งสร้าง) เพราะสเปคไม่ได้ระบุปลายทางหลัง submit ชัดเจน และ Main เป็นจุดที่เห็นรายการใหม่ในลิสต์ได้ทันที
2. **Search ใน Main ไม่เจอ → แสดง modal** (ไม่ใช่ inline error text และไม่ filter list ในหน้า) เพื่อแยกความชัดเจนระหว่าง "ค้นหาไม่เจอ" กับ empty state ของลิสต์เอง

Copy ใน wireframe เดิมมีจุดพิมพ์ผิด ("กรอง..." ควรเป็น "กรอก...") แก้ไขตรงๆ ใน code โดยไม่ได้ย้อนไปแก้ Figma

## Known limitations

- ยังไม่ได้รันบน simulator/emulator จริง (ไม่มี Xcode/Android SDK ในสภาพแวดล้อมที่ build โค้ดนี้) — ตรวจสอบผ่าน `pnpm lint` + `pnpm test` (typecheck ผ่าน, 51 tests ผ่านทั้งหมด) เท่านั้น ก่อน merge ควรรันจริงบนอุปกรณ์อย่างน้อยหนึ่งครั้ง
- Design tokens (`src/theme/`) เป็นค่าตั้งต้นที่กำหนดเองใน code ไม่ได้ sync กับ Figma variables จริง (ตามที่ระบุใน [PLAN.md](./PLAN.md#7-figma) ว่าข้ามขั้นตอนนี้เพื่อประหยัดเวลา)

## AI-Assisted Development

ใช้ Claude Code ช่วยตลอด workflow ของโปรเจกต์นี้ ตาม role ที่กำหนดไว้ใน `.claude/agents/`:

| Role        | Subagent   | หน้าที่                                                                  |
| ----------- | ---------- | ------------------------------------------------------------------------- |
| Planner     | `ba`       | วิเคราะห์ requirement/acceptance criteria ก่อนเริ่ม implement ไม่แตะโค้ด |
| Design      | `design`   | รีวิว/เสนอ visual direction, sync design tokens กับ Figma variables      |
| Implementor | `frontend` | Implement screens/components/state ตาม `CLAUDE.md`                        |
| Reviewer    | `qa`       | เช็คผลงานเทียบ acceptance criteria + testID convention + build health    |

Flow: `ba` (วางแผน, ไม่แตะโค้ด) → approve → `frontend` (implement + test) → `qa` (review, ไม่แก้เอง แต่ report) → เสร็จ

Custom slash commands (`.claude/commands/`): `/new-screen`, `/gen-test`, `/review-a11y`

หลักการ: ใช้ AI scaffold โครง/boilerplate เพื่อความเร็ว แต่ logic สำคัญ (validation, reducer, business rule) ตรวจและเข้าใจเองก่อน commit ทุกครั้ง ไม่เดา business rule ที่สเปคไม่ระบุ (ดู section decisions ด้านบน) ไม่ commit โค้ดที่ยังไม่เข้าใจ 100%
