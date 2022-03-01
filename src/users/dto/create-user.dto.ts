import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class CreateUserDto {
    //ayrıca swagger üzerinde gözükmesini istediğimiz her property için başına @ApiProperty eklememiz gerekiyor yoksa gözükmez
    @ApiProperty()  //api'ın özelliklerini default olarak gelmesini sağladık. Yani swagger içerisinde POST bölümünde eklediğimiz property'lerin(özelliklerin) gözükmesini sağlayacak(name:string gibi)
    @IsAlphanumeric() //Dizinin harf ve sayı içerip içermediğini kontrol eder
    @MaxLength(10) //Maksimum karakter sayısının verilen sayıdan fazla olup olmadığını kontrol eder
    name: string;

    /*
    @ApiProperty({required: false})
    age?: number;  //? = isteğe bağlı yani kullanıcının age property'sini girmesi zorunlu değil.
    //"Zorunlu değil işareti = *" ayrıca zorunlu olmayan bir alan için ekstra olarak apiPropert içerisine required: false yazmamız gerekiyor
    */
}