const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLInputObjectType
} = require('graphql');
// Please create your own config file
const API_KEY = require('../config');
const axios = require('axios');
const {
	AddressType,
	AddressesInputType,
	DeleteResponse,
	GetAddressDataType,
  	AddressObject
} = require('./type');

//Root Query
const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields: {
		// Returns a list of your addresses.
		listAllAddresses:{
			type: new GraphQLList(AddressType),
			resolve(parentValue,args){
				return axios({
					url: 'https://api.lob.com/v1/addresses',
				  	method: 'get',
				  	headers:{'Authorization':'Basic '+API_KEY}
				}).then((result) => {
					return result.data.data;
				}).catch(function (error) {
				    console.log(error);
				  });
			}
		},

		//Retrieves the details of an existing address. 
		findAddressById:{
			type: AddressType,
			args: {id:{type:new GraphQLNonNull(GraphQLString)}},
			resolve(parentValue,args){
				return axios({
					url: 'https://api.lob.com/v1/addresses/'+args.id,
					method: 'get',
				  	headers:{'Authorization':'Basic '+API_KEY}
				}).then((result)=>{
					return result.data;
				}).catch((error)=>{
					console.log(error);
				});
				
			}
		}
	}	
});

//Mutations
const mutation = new GraphQLObjectType({
	name:'Mutation',
	fields: {
		//Creates a new address object. 
		createAddress:{
			type: AddressType,
			args:AddressObject,
			resolve(parentValue,args){
				return axios({
					url: 'https://api.lob.com/v1/addresses',
				  	method: 'post',
				  	headers:{'Authorization':'Basic '+API_KEY},
				  	data:{
				  			description: args.description,
							name:args.name,
							company:args.company,
							phone:args.phone,
							email:args.email,
							address_line1:args.address_line1,
							address_line2:args.address_line2,
							address_city:args.address_city,
							address_state:args.address_state,
							address_zip:args.address_zip,
							address_country:args.address_country
				  		}
				}).then((result) => {
					return result.data;
				}).catch(function (error) {
				    console.log(error);
				  });
			}
		},

		//Permanently deletes a customer. It cannot be undone.
		deleteAddressById:{
			type: AddressType,
			args:{
				id: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parentValue,args){
				return axios({
					url: 'https://api.lob.com/v1/addresses/'+args.id,
				  	method: 'delete',
				  	headers:{'Authorization':'Basic '+API_KEY},
				}).then((result) => {
					return result.data;
				}).catch(function (error) {
				    console.log(error);
				  });
			}
		}
	}	
}); 
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation:mutation
});