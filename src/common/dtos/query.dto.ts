import { ApiProperty } from "@nestjs/swagger";
import { SortEnum } from "../enum/sort.enum";

export class QuertDto {
    @ApiProperty({ description: 'Sort the results by column', required: false, enum: SortEnum })
    sort: SortEnum;

    @ApiProperty({ description: 'Search keyword', required: false })
    keyword: string;

    @ApiProperty({
        description: 'includes', required: false, type: () => [String],
        isArray: true,
    })
    includes: string[]
}