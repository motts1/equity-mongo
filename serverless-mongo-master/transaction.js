'use strict';
const Transaction = require('./models/Transaction').default;
const mongoose = require('mongoose');

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const transaction = await Transaction.create(JSON.parse(event.body));
    await mongoose.connection.close()
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(transaction),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    await mongoose.connection.close()
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};

module.exports.getOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('Transaction Event: ', event);
  console.log('Transaction Context: ', context);
  console.log('Transaction Callback: ', callback);
  try {
    await mongoose.connect(process.env.DB)
    const transaction = await Transaction.find({ id: event.pathParameters.id });
    await mongoose.connection.close();
    console.log('Transaction object: ', transaction);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(transaction),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    console.log('Transaction error: ', err);
    await mongoose.connection.close()
    callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};

module.exports.getAll = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const users = await Transaction.find();
    await mongoose.connection.close()
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(users),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    })
  } catch(err) {
    console.log('Error: ', err)
    await mongoose.connection.close()
    callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    })
  }
};

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB)
    const transaction = await Transaction.findOneAndUpdate({ id: event.pathParameters.id }, JSON.parse(event.body), { new: true });
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(transaction),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    await mongoose.connection.close()
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB)
    const transaction = await Transaction.findOneAndRemove({ id: event.pathParameters.id });
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Removed transaction with id: ' + transaction._id,
        transaction: transaction
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    await mongoose.connection.close()
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};
