import { match } from "assert";
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsString()
    author: string;
    @IsInt()
    length: number;
    @IsInt()
    price: number;
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
}
