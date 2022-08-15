import React, { useState, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";




const StyledForm = styled.div `
max-width: 100%;
padding: 95px 0 137px 0;

.container{
    max-width: 1170px;
    margin: auto;
    padding: 0 15px;
}

.form-title{
    text-align: center;
    margin-bottom: 50px;
    font-size: 45px;
}
.form-input-wrapper{
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-input_label{
    display: block;
    font-size: 20px;
    color: #212020;
    margin-bottom: 10px;
}
.form-input{
    width: 400px;
    font-size: 16px;
    padding: 10px;
    border: 1px solid #212020;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
}
.error{
    font-size: 14px;
    margin-bottom: 10px;
    color: red
}
.form-input_checkbox{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
}
.checkbox{
    display: flex;
    flex-direction: row
}
.form-checkbox_label{
    font-size: 20px;
    color: #212020;
    margin-right: 10px;
}
.checkbox-right{
    margin-right: 50px;
}
.input-refer{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.refer-label{
    align-self: center;
}
.form-input_file{
    margin-top: 15px;
}
.btn-submit{
    background: lightblue;
    width: 281px;
    padding: 18px 46px;
    font-size: 15px;
    text-align: center;
    text-transform: uppercase;
    border: none;
    border-radius: 50px;
    margin: 15px auto;
    display: block;
    cursor: pointer;
}
.message-wrapper{
    display: flex;
    justify-cintent: center;
    margin-top: 10px;
}
.message{
    text-aline: center;
    font-size: 30px;
    color: red;
}
.file-input{
    margin-bottom: 10px;
}
@media (max-width: 418px) {
    .form-input{
        width: 330px;
    }
    .message{
        font-size: 25px;
        text-align: center;
    }

@media (max-width: 358px) {
    .form-input{
        width: 290px;
    }
    .message{
        font-size: 20px;
        text-align: center;
    }
}
`

const Form =()=>{

    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [person, setPerson] = useState('');
    const [company, setCompany] = useState('');
    const [personNumber, setPersonNumber] = useState('');
    const [companyNumber, setCompanyNumber] = useState('');
    const [message, setMessage] = useState("");



    const valSchema = yup.object().shape({
        zdjęcie: yup.mixed().test('required', 'Zdjęcie jest wymagane', value =>{
            return value && value.length}),
        imię: yup.string().required('Imię jest wymagane'),
        nazwisko: yup.string().required('Nazwisko jest wymagane'),
        osoba: yup.boolean(),
        firma: yup.boolean(),
        refer: yup.string().when("osoba", {
          is: true,
          then: yup.string().matches(/^[0-9]{11}$/, 'Musi mieć 11 liczb').required("PESEL jest wymagane")
        }),
        refer1: yup.string().when("firma", {
            is: true,
            then: yup.string().matches(/^[0-9]{10}$/, 'Musi mieć 11 liczb').required("NIP jest wymagany ")
          }),
      }).test(
        'myCustomTest',
        null,
        (obj) => {
          if ( obj.osoba || obj.firma ) {
            return true; 
          } 
          return new yup.ValidationError(
            'Please check one checkbox',
            null,
            "choices"
          );
        }
      )


      const {register, handleSubmit, watch, formState: { errors }, method} = useForm({
        resolver: yupResolver(valSchema),
        mode: "onSubmit"
      });

      let referedStatusOsoba = watch("osoba", false);
      let referedStatusFirm = watch("firma", false);

      const onSubmit = async () => {
        try{
            let response = await fetch(" https://localhost:60001/Contractor/Save",{
                method: "POST",
                body: JSON.stringify({
                    zdjęcie: selectedImage,
                    imię: name,
                    nazwisko: lastname,
                    osoba: person,
                    firma: company,
                    refer: personNumber,
                    refer1: companyNumber
                }),
                headers: {
                    'Content-Type': 'application/json'
                  },
            });
            let result = await response.json();
            if(result.status === 200){
                setSelectedImage('');
                setName('');
                setLastName('');
                setPerson('');
                setCompany('');
                setPersonNumber('');
                setCompanyNumber('')
                setMessage("Great")
            };
        }catch(error){
            console.log(error)
            setMessage("Nie znaleziono metody zapisu")
        }
      };


    return(

    <StyledForm>
        <div className={"container"}>
            <h1 className={"form-title"}>Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"form-input-wrapper form-input_firstname"}>
                    <label htmlFor="imię" className={"form-input_label"}>Imię</label> 
                    <input type="text" id="imię" className={"form-input"} {...register("imię")} 
                    onChange={(e)=>setName(e.target.value)}/>
                    <div className={"error"}>{errors.imię?.message}</div>
                </div>

                <div className={"form-input-wrapper form-input_lastname"}>
                    <label htmlFor="nazwisko" className={"form-input_label"}>Nazwisko</label> 
                    <input type="text" id="nazwisko" className={"form-input"} {...register("nazwisko")}
                    onChange={(e)=>setLastName(e.target.value)}/>
                    <div className={"error"}>{errors.nazwisko?.message}</div>
                </div>

                
                <div className={"form-input-wrapper"}>
                    <div className={"form-input_checkbox"}>
                        <div className={"checkbox checkbox-right"}>
                            <label className={"form-checkbox_label"} htmlFor="osoba"> Osoba </label>
                            <input type="checkbox" id="osoba" {...register("osoba")}
                            onChange={(e)=>setPerson(e.target.value)}/>
                        </div>
                        <div className={"checkbox"}>
                            <label className={"form-checkbox_label"} htmlFor="firma">Firma</label>
                            <input type="checkbox" id="firma" {...register("firma")}
                            onChange={(e)=>setCompany(e.target.value)}/>
                        </div>
                    </div>
                    <div className={"error"}>{errors.choices?.message}</div>

                    <div className={"form-input-wrapper form-inputs_checkbox"}>
                      {referedStatusOsoba && (
                        <div className={"input-refer"}>
                            <label htmlFor="refer" className={"form-input_label refer-label"}>PESEL</label>
                            <input type="text" className={"form-input"} {...register("refer")}
                            onChange={(e)=>setPersonNumber(e.target.value)}/>
                            <div className={"error"}>{errors.refer?.message}</div>
                        </div>
                      )}

                      {referedStatusFirm && (
                         <div className={"input-refer"}>
                            <label htmlFor="refer1" className={"form-input_label refer-label"}>NIP</label>
                            <input type="text" className={"form-input"} {...register("refer1")}
                             onChange={(e)=>setCompanyNumber(e.target.value)}/>
                            <div className={"error"}>{errors.refer1?.message}</div>
                         </div>
                      )}
                   </div>
                </div>          

                <div className={"form-input-wrapper form-input_file"}>
                    <label htmlFor="zdjęcie" className={"form-input_label"}>Załaduj zdjęcie</label>
                    <input type="file" accept="image/jpg, image/jepg" {...register("zdjęcie")} className={"file-input"} 
                          onChange={(event) => {
                            setSelectedImage(event.target.files[0]);
                            }}
                    />
                    <div className={"error"}>{errors.zdjęcie?.message}</div>

                    {selectedImage && (
                        <div className={"img-wrapper"}>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        </div>
                    )}
                </div>

                <button type="submit" className={"btn-submit"}>Wysłać</button>

                <div className={"message-wrapper"}>{message ? <p className={"message"}>{message}</p> : null}</div>
            </form>
        </div>

    </StyledForm>  
    )
}

export default memo(Form);