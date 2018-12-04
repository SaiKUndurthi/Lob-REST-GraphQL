const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLInputObjectType
} = require('graphql');

//Address object
const AddressObject = {
	description:{type:GraphQLString},
	name:	{type:GraphQLString},
	company:	{type:GraphQLString},
	phone:	{type:GraphQLString},
	email:	{type:GraphQLString},
	address_line1:	{type:GraphQLString},
	address_line2:	{type:GraphQLString},
	address_city:	{type:GraphQLString},
	address_state:	{type:GraphQLString},
	address_zip:	{type:GraphQLString},
	address_country:	{type:GraphQLString}
}
//Address Type
const AddressType = new GraphQLObjectType({
	name:'Address',
	fields:()=>(Object.assign({
		id:	{type:GraphQLString},
		date_created:	{type:GraphQLString},
		date_modified:	{type:GraphQLString},
		object:	{type:GraphQLString}
	},AddressObject))			
});
//Address Input type
const AddressesInputType = new GraphQLInputObjectType({
	name:'AddressInput',
	fields:()=>(Object.assign({
		id:	{type:GraphQLString},
		date_created:	{type:GraphQLString},
		date_modified:	{type:GraphQLString},
		object:	{type:GraphQLString}
	},AddressObject))			
});
//Delete Response also returns a boolean "deleted"
const DeleteResponse =new GraphQLObjectType({
	name:'DeleteResponse',
	fields:()=>({
		id:{type:GraphQLString},
		deleted:{type:GraphQLBoolean}
	})
		
});
// GetAddressDataType can be used to get the count of the address data returned.
const GetAddressDataType = new GraphQLObjectType({
	name:'GetAddressData',
	fields:()=>({
		data: {type: new GraphQLList(AddressesType)},
		count: {type: GraphQLInt},
		object: {type: GraphQLString}
	})
});

module.exports={
  AddressType: AddressType,
  AddressesInputType: AddressesInputType,
  DeleteResponse: DeleteResponse,
  GetAddressDataType: GetAddressDataType,
  AddressObject: AddressObject
}