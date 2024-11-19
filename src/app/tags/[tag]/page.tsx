export default function TagPage({params}:{params:{tag: string}}){
    return(
        <h2>{params.tag}</h2>
    )
}