import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";
import { StudioCreateBody } from './studio-create.body';

export class StudioUpdateBody extends PartialType(StudioCreateBody) { }
