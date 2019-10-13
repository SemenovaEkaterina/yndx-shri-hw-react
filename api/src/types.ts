export type ExecFuncI = (
    name: string, args: string[], options: { cwd: string },
) => Promise<{ stderr?: string, stdout?: string }>;
