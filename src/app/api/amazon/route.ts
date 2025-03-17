import { NextRequest, NextResponse } from 'next/server';
import {
  GetItemsRequest,
  PartnerType,
  Host,
  Region
} from 'paapi5-typescript-sdk';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productIds = searchParams.getAll('productId');

    if (!productIds.length) {
      return NextResponse.json(
        { error: 'Missing productId(s)' },
        { status: 400 }
      );
    }

    // Amazon API allows up to 10 ASINs per request
    const maxItems = 10;
    const limitedProductIds = productIds.slice(0, maxItems);

    const request = new GetItemsRequest(
      {
        ItemIds: limitedProductIds, // Send multiple ASINs
        Resources: [
          'Images.Primary.Large',
          'ItemInfo.Title',
          'Offers.Listings.Price',
          'ItemInfo.ByLineInfo',
          'ItemInfo.Classifications',
          'ItemInfo.Features',
          'ItemInfo.ContentInfo'
        ]
      },
      process.env.AMAZON_ASSOCIATE_TAG!,
      PartnerType.ASSOCIATES,
      process.env.AMAZON_API_ACCESS!,
      process.env.AMAZON_API_SECRET!,
      Host.UNITED_STATES,
      Region.UNITED_STATES
    );

    const data = await request.send();

    if (!data.ItemsResult?.Items?.length) {
      return NextResponse.json({ error: 'No products found' }, { status: 404 });
    }

    // Map response to return structured product data
    const products = data.ItemsResult.Items.map((product) => ({
      asin: product?.ASIN ?? 'N/A',
      title: product?.ItemInfo?.Title?.DisplayValue ?? 'Unknown Product',
      brand:
        product?.ItemInfo?.ByLineInfo?.Brand?.DisplayValue ?? 'Unknown Brand',
      category:
        product?.ItemInfo?.Classifications?.ProductGroup?.DisplayValue ??
        'Unknown Category',
      price: product?.Offers?.Listings?.[0]?.Price?.DisplayAmount ?? 'N/A',
      image: product?.Images?.Primary?.Large?.URL ?? '',
      url: product?.DetailPageURL ?? '',
      features: product?.ItemInfo?.Features?.DisplayValues ?? []
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error('❌ Error fetching Amazon products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
