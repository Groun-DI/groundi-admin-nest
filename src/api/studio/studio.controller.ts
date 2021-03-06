
import { UseInterceptors, UploadedFiles, Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Patch, Query } from '@nestjs/common';
import { StudioService } from './studio.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, JwtModel } from 'src/auth-guard/jwt/jwt.auth-guard';
import { Studios as StudioModel } from '@prisma/client';
import { StudioRentalPrices as StudioRentalPricesModel } from '@prisma/client';
import { StudioRentalRequestForms as StudioRentalRequestFormsModel } from '@prisma/client';
import { StudioRentalReceipts as StudioRentalReceiptsModel } from '@prisma/client';
import { StudioCreateBody } from 'src/dto/studio-create.body';
import { StudioUpdateBody } from 'src/dto/studio-update';
import { AmenityUpdateBody } from 'src/dto/amenity-update.body';
import { ComplimentaryUpdateBody } from 'src/dto/complimentary-update';
import { PrecautionUpdateBody } from 'src/dto/precaution-update.body';
import { StudioImageUpdateBody } from 'src/dto/studio-image-update';
import { Studio } from 'src/decorators/studio.decorator';
import { RentalPriceCreateBody } from 'src/dto/rental-price-create.body';
import { HolidayCreateBody } from 'src/dto/holiday-create-body';
import { NationalHolidayCreateBody } from 'src/dto/national-holiday-create-body';
import { DateFilter } from 'src/decorators/filter/date.decorator';
import { DateFilterDto } from 'src/dto/date-filter.body';
import { RentalReceiptCreateBody } from 'src/dto/rental-receipt-create.body';
import { User } from 'src/decorators/user.decorator';
import { RentalRequestFormsCreateBody } from 'src/dto/rental-request-form-create.body copy';

@UseGuards(JwtAuthGuard)
@Controller('/centers/:centerId/studios')
export class StudioController {
  constructor(private readonly studioService: StudioService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  studioCreate(@Param('centerId') centerId: number, @UploadedFiles() images: Array<Express.Multer.File>, @Studio() body: StudioCreateBody) {
    return this.studioService.studioCreate(+centerId, images, body);
  }

  @Post(':studioId/rental-prices')
  rentalPriceCreate(@Param('studioId') studioId: number, @Body() body: RentalPriceCreateBody) {
    return this.studioService.rentalPriceCreate(+studioId, body);
  }

  @Post(':studioId/holidays')
  holidaysCreate(@Param('studioId') studioId: number, @Body() body: HolidayCreateBody) {
    return this.studioService.holidaysCreate(+studioId, body);
  }

  @Post(':studioId/national-holidays')
  nationalHolidaysCreate(@Param('studioId') studioId: number, @Body() body: NationalHolidayCreateBody) {
    return this.studioService.nationalHolidaysCreate(+studioId, body);
  }

  @Post(':studioId/rental-request-forms')
  rentalRequestFormsCreate(@User() user: JwtModel, @Param('studioId') studioId: number, @Body() body: RentalRequestFormsCreateBody): Promise<StudioRentalRequestFormsModel> {
    return this.studioService.rentalRequestFormsCreate(+user.id, +studioId, body);
  }

  @Post(':studioId/rental-request-forms/:rentalRequestFormId/rental-receipts')
  rentalReceiptsCreate(@Param('rentalRequestFormId') rentalRequestFormId: number, @Body() body: RentalReceiptCreateBody): Promise<StudioRentalReceiptsModel> {
    return this.studioService.rentalReceiptsCreate(+rentalRequestFormId, body);
  }

  @Get()
  studioFindAll(@Param('centerId') centerId: number) {
    return this.studioService.studioFindAll(+centerId);
  }

  @Get(':studioId')
  studioFindOne(@Param('studioId') studioId: string): Promise<StudioModel> {
    return this.studioService.studioFindOne(+studioId);
  }

  @Get(':studioId/rental-prices')
  rentalPriceFindAll(@Param('studioId') studioId: string): Promise<StudioRentalPricesModel[]> {
    return this.studioService.rentalPriceFindAll(+studioId);
  }

  @Get(':studioId/rental-receipts')
  rentalReceiptsFindAll(@Param('studioId') studioId: string, @DateFilter() dateFilter: DateFilterDto): Promise<StudioRentalReceiptsModel[]> {
    return this.studioService.rentalReceiptsFindAll(+studioId, dateFilter);
  }

  @Patch(':studioId')
  studioUpdate(@Param('studioId') studioId: number, @Body() body: StudioUpdateBody) {
    return this.studioService.studioUpdate(+studioId, body);
  }

  @Patch(':studioId/amenities')
  amenityUpdate(@Param('studioId') studioId: number, @Body() body: AmenityUpdateBody[]) {
    return this.studioService.amenityUpdate(+studioId, body);
  }

  @Patch(':studioId/complimentaries')
  complimentaryUpdate(@Param('studioId') studioId: number, @Body() body: ComplimentaryUpdateBody[]) {
    return this.studioService.complimentaryUpdate(+studioId, body);
  }

  @Patch(':studioId/precautions')
  precautionUpdate(@Param('studioId') studioId: number, @Body() body: PrecautionUpdateBody[]) {
    return this.studioService.precautionUpdate(+studioId, body);
  }

  @Patch(':studioId/images')
  studioImageUpdate(@Param('studioId') studioId: number, @Body() body: StudioImageUpdateBody) {
    return this.studioService.studioImageUpdate(+studioId, body);
  }

  @Delete(':studioId')
  studioDelete(@Param('studioId') studioId: number) {
    return this.studioService.studioDelete(+studioId);
  }
}