export default interface ProductType{
    _id: string,
    description:string,
    summDesc: string,
    productName:string,
    productUrl: string,
    tags:string[],
    upVotes: number,
    voters: [string],
    createdAt: Date
}