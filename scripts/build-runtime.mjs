import { rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

rmSync(new URL('../dist', import.meta.url), { recursive: true, force: true })
execFileSync('tsc', ['-p', 'tsconfig.build.json'], { stdio: 'inherit' })
