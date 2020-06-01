import withRest from "@moxy/next-rest-api";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'isomorphic-unfetch';

const items = async (req: NextApiRequest, res: NextApiResponse) => {

  const data = {"token":"4b4d85e0fccff04da2c42a71a675dbc0","note":null,"attributes":{},"original_total_price":14900,"total_price":14900,"total_discount":0,"total_weight":1027.0,"item_count":3,"items":[{"id":30444725370944,"properties":null,"quantity":1,"variant_id":30444725370944,"key":"30444725370944:b58711c55fd20623e398eba1ddd6de75","title":"Chequered Red Shirt - xs","price":4400,"original_price":4400,"discounted_price":4400,"line_price":4400,"original_line_price":4400,"total_discount":0,"discounts":[],"sku":"","grams":446,"vendor":"Liam Fashions","taxable":true,"product_id":4176662593600,"product_has_only_default_variant":false,"gift_card":false,"final_price":4400,"final_line_price":4400,"url":"\/products\/chequered-red-shirt?variant=30444725370944","featured_image":{"aspect_ratio":1.499,"alt":"Chequered Red Shirt","height":617,"url":"https:\/\/cdn.shopify.com\/s\/files\/1\/0125\/4306\/6176\/products\/red-plaid-shirt_925x_81c4f007-c666-4456-9a91-91e12e6963bb.jpg?v=1570144969","width":925},"image":"https:\/\/cdn.shopify.com\/s\/files\/1\/0125\/4306\/6176\/products\/red-plaid-shirt_925x_81c4f007-c666-4456-9a91-91e12e6963bb.jpg?v=1570144969","handle":"chequered-red-shirt","requires_shipping":true,"product_type":"","product_title":"Chequered Red Shirt","product_description":"Classic mens plaid flannel shirt with long sleeves, in chequered style, with two chest pockets.","variant_title":"xs","variant_options":["xs"],"options_with_values":[{"name":"Title","value":"xs"}],"line_level_discount_allocations":[],"line_level_total_discount":0},{"id":30444721209408,"properties":{},"quantity":1,"variant_id":30444721209408,"key":"30444721209408:63f3b68fa7ac4dafd01bf04405d396c0","title":"Classic Varsity Top - xs","price":4500,"original_price":4500,"discounted_price":4500,"line_price":4500,"original_line_price":4500,"total_discount":0,"discounts":[],"sku":"","grams":326,"vendor":"Liam Fashions","taxable":true,"product_id":4176661971008,"product_has_only_default_variant":false,"gift_card":false,"final_price":4500,"final_line_price":4500,"url":"\/products\/classic-varsity-top?variant=30444721209408","featured_image":{"aspect_ratio":1.499,"alt":"Classic Varsity Top","height":617,"url":"https:\/\/cdn.shopify.com\/s\/files\/1\/0125\/4306\/6176\/products\/casual-fashion-woman_925x_ee01fb5b-2d9c-499a-98ae-b60fbd630f74.jpg?v=1570144962","width":925},"image":"https:\/\/cdn.shopify.com\/s\/files\/1\/0125\/4306\/6176\/products\/casual-fashion-woman_925x_ee01fb5b-2d9c-499a-98ae-b60fbd630f74.jpg?v=1570144962","handle":"classic-varsity-top","requires_shipping":true,"product_type":"","product_title":"Classic Varsity Top","product_description":"Womens casual varsity top, This grey and black buttoned top is a sport-inspired piece complete with an embroidered letter.","variant_title":"xs","variant_options":["xs"],"options_with_values":[{"name":"Title","value":"xs"}],"line_level_discount_allocations":[],"line_level_total_discount":0},{"id":30444725665856,"properties":{},"quantity":1,"variant_id":30444725665856,"key":"30444725665856:56722226dd8d5a3e127d06b4f1de8542","title":"Blue Silk Tuxedo - Blue \/ x-small","price":6000,"original_price":6000,"discounted_price":6000,"line_price":6000,"original_line_price":6000,"total_discount":0,"discounts":[],"sku":"","grams":255,"vendor":"Liam Fashions","taxable":true,"product_id":4176662659136,"product_has_only_default_variant":false,"gift_card":false,"final_price":6000,"final_line_price":6000,"url":"\/products\/blue-silk-tuxedo?variant=30444725665856","featured_image":{"aspect_ratio":0.995,"alt":"Blue Silk Tuxedo","height":1503,"url":"https:\/\/cdn.shopify.com\/s\/files\/1\/0125\/4306\/6176\/products\/Mens-Royal-Blue-Velvet-Tuxedo-Jacket-With-Shawl-Collar-from-Gentlemansguru.com.jpg?v=1577069100","width":1495},"image":"https:\/\/cdn.shopify.com\/s\/files\/1\/0125\/4306\/6176\/products\/Mens-Royal-Blue-Velvet-Tuxedo-Jacket-With-Shawl-Collar-from-Gentlemansguru.com.jpg?v=1577069100","handle":"blue-silk-tuxedo","requires_shipping":true,"product_type":"","product_title":"Blue Silk Tuxedo","product_description":"Blue silk tuxedo with marbled aquatic pattern and dark lining. Sleeves are complete with rounded hem and black buttons.","variant_title":"Blue \/ x-small","variant_options":["Blue","x-small"],"options_with_values":[{"name":"Color","value":"Blue"},{"name":"Size","value":"x-small"}],"line_level_discount_allocations":[],"line_level_total_discount":0}],"requires_shipping":true,"currency":"USD","items_subtotal_price":14900,"cart_level_discount_applications":[]}
  return data
};

export default withRest({
  GET: items
});
