export interface MovieModel{
    title: string,
    genre: string[],
    releaseYear: string,
    description: string,
    image: string,
    mainActors: string[],
    duration: number;
    startsShowing: Date,
}