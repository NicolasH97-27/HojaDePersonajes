import "../form.css"

const ageValidator = (value) => {
    return value>=2 && value<= 1000
}
const Row = ({form,register,errors,message,handleChange,selected}) =>{

    return(
        <div  className='rows'>
            <div className="txt_field">
                <input type="text" placeholder={form.name} {...register('name', {
                    required: true
                })}/>
                <span></span>
                <label>Nombre:</label>
            </div>
            <div className="txt_field">
                <input placeholder={form.age} type="text"   {...register('age', {
                    required: true,
                    validate:ageValidator
                })}/>
                <span></span>
                <label>edad:</label>
                {errors.age  && message("Flaco no te pases de piola porque te juro que te surto. Es joda. Pero ,por favor ,pone bien la edad, no te cuesta nada.")}
            </div>
            <div className="radios"  > {/*como modificar el cheked para que esten chekeados cuando llegue la info*/}
                <input value = "m" onClick={handleChange} checked = {selected==="m" } type= "radio"   {...register('gender')} />
                <label >masculino</label>
                <input value = "f" onClick={handleChange} checked = {selected==="f" } type= "radio"   {...register('gender')} />
                <label >femenino</label>
                <input value = "a" onClick={handleChange} checked = {selected==="a" } type="radio" {...register('gender')}/>
                <label >otro</label>
            </div>
            </div>
    )
}





export default Row

