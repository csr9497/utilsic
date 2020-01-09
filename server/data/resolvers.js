import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import mongoose from 'mongoose';
import { clients, products } from './db';
import { rejects } from 'assert';

export const resolvers = {
    Query: {
        getClient: ( root,{ id }) => {
            return new Promise((resolve, object) => {
                clients.findById(id, (error, client) => {
                    if (error) rejects(error)
                    else resolve(client)
                });
            });
        },
        getClients: (root, { limit, offset }) => {
            return clients.find({}).limit(limit).skip(offset);
        },
        countClients: (root) => {
            return new Promise((resolve, object)=>{
                clients.countDocuments({}, (error, count)=>{
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        getProduct: (root, { id }) => {
            return new Promise((resolve, object) => {
                products.findById(id,(error,product) => {
                    if(error) rejects(error)
                    else resolve(product)
                })
            })
        },
        getProducts: (root , {limit, offset}) => {
            return products.find({}).limit(limit).skip(offset)
        },
        countProducts: (root) => {
            return new Promise((resolve, object)=>{
                products.countDocuments({}, (error, count)=>{
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },

    },
    Mutation: {
        createClient: (root, { input }) => {
            const newClient = new clients({
                name: input.name,
                last_name: input.last_name,
                job: input.job,
                emails: input.emails,
                edad: input.edad,
                tipo: input.tipo,
                orders: input.orders
            });
            newClient.id = newClient._id;
            return new Promise((resolve, object) => {
                newClient.save((error) => {
                    if (error) rejects(error)
                    else resolve(newClient)
                })
            });
        },
        updateClient: (root, { input }) => {
            return new Promise((resolve, object) => {
                clients.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, Client) => {
                    if (error) rejects(error)
                    else resolve(Client)
                });
            });
        },
        removeClient: (root, { id }) => {
            return new Promise((resolve, object) => {
                clients.findOneAndRemove({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve(`Se logro eliminar el usuario`);
                })
            });
        },

        // Resolver for products 

        createProduct: (root, { input }) => {
            const newProduct = new products({
                name : input.name,
                model: input.model,
                brand: input.brand,
                price: input.price,
                stock: input.stock,
                delay: input.delay,
            })
            newProduct.id = newProduct._id
            return new Promise( (resolve, object)=>{
                newProduct.save((error) => {
                    if (error) rejects(error)
                    else resolve(newProduct)
                })
            })
        },

        updateProduct:(root, { input}) => {
            return new Promise((resolve, object) => {
                products.findOneAndUpdate({ _id: input.id}, input ,{ new: true }, (error, Product) => {
                    if(error) rejects(error)
                    else resolve(Product)
                })
            })
        },

        deleteProduct:(root, { id }) => {
            return new Promise((resolve, object) => {
                products.findOneAndDelete({ _id:id}, (error) => {
                    if(error) rejects(error)
                    else resolve(`Se logro eliminiar el producto`)
                })
            })
        },

        
    }
}