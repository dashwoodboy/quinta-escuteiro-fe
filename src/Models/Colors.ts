export enum Colors {
    LOBITOS,
    EXPLORADORES,
    PIONEIROS,
    CAMINHEIROS,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Colors {
    export function text(color: Colors): string {
        switch (color) {
            case Colors.LOBITOS:
                return "text-lobitos";
            case Colors.EXPLORADORES:
                return "text-exploradores";
            case Colors.PIONEIROS:
                return "text-pioneiros";
            case Colors.CAMINHEIROS:
                return "text-caminheiros";
        }
    }

    export function background(color: Colors): string {
        switch (color) {
            case Colors.LOBITOS:
                return "bg-lobitos";
            case Colors.EXPLORADORES:
                return "bg-exploradores";
            case Colors.PIONEIROS:
                return "bg-pioneiros";
            case Colors.CAMINHEIROS:
                return "bg-caminheiros";
        }
    }

    export function border(color: Colors): string {
        switch (color) {
            case Colors.LOBITOS:
                return "border-lobitos";
            case Colors.EXPLORADORES:
                return "border-exploradores";
            case Colors.PIONEIROS:
                return "border-pioneiros";
            case Colors.CAMINHEIROS:
                return "border-caminheiros";
        }
    }
}
