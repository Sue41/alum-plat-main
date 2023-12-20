export default function AddBtn({title}){
    return(

        <div className='add-btn'>
            <div className='cross'>+</div>
            <div className='add-name'>{title}</div>
        </div>
    )
}