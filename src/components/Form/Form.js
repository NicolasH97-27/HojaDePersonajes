import { useForm } from "react-hook-form"
import "./form.css"
import { useState, useEffect} from "react"
import Row from "./Row/Row"


const Form = ({info,onClick,message}) =>{
    
    const form = (info && info.length) ? 
    {
        age:info[info.length-1].age,
        name:info[info.length-1].name,
        gender:info[info.length-1].gender
        
    }: {
        age:"",
        name:"",
        gender:""
    }

    const {register,formState : {errors}, handleSubmit} = useForm()
    const [selected,setSelected] = useState()
    
    useEffect(()=>{
        (info && info.length) ? setSelected(form.gender) : setSelected("")
    },[info,form.gender,message])

    const onSubmit = (data) =>{
        onClick(data)   
        message("Guardaste tu personaje papu")
        setTimeout(() => {
            message(null)
        }, 5000)
        
    }

    const errorMessege = (data) => {
        message(data)
    }


    // se puede hacer esto:
    // return !(info && info.length) ? <div>cargando...</div> : (


    const handleChange = event => {
        
        setSelected(event.target.value);
    };
    const rows = [0]
    return  (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="conteiner-formulario">

            <div className="colums">
            {rows.map(rows=>{
                return(
                    <Row
                    key={rows}
                    form={form}
                    register={register}
                    errors={errors}
                    message={errorMessege}
                    handleChange={handleChange}
                    selected={selected}
                    />
                )
            })}
            </div>
            <input className="guardar" type="submit" value="guardar cambios"/>
            </div>
        </form>
       

    )
}

export default Form