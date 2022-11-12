export type TrelloBoard = {
    id: number;
    title: string;
    cards: TrelloCard[]
}

export type TrelloCard = {
    id: number;
    title: string;
    description: string;
    date: any;
}