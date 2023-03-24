export interface DeleteButtonProps {
    id: number
    refreshCurrentState: number
    refresh: (value: number) => void;
}

export interface ViewProps {
    id: number
}

export interface AddButtonProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
}