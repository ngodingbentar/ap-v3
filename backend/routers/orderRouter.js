import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import {
  isAdmin,
  isAuth,
} from '../utils.js';
import request from 'request'
import dotenv from 'dotenv'

dotenv.config()
const orderRouter = express.Router();

const keyResi= process.env.KEY_RESI
const keyOngkir= process.env.KEY_ONGKIR

orderRouter.get(
  '/cekenv',
  expressAsyncHandler(async (req, res) => {
    const orders = {
      keyResi: keyResi,
      keyOngkir: keyOngkir
    }
    res.send(orders);
  })
);
orderRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
      order.confirmImg = req.body.confirmImg || order.confirmImg;
      order.resi = req.body.resi || order.resi;
      order.status = req.body.status || order.status
      const updatedOrder = await order.save();
      res.send({ message: 'Order Updated', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate(
      'user',
      'name'
    );
    res.send(orders);
  })
);

orderRouter.get(
  '/cb',
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate(
      'user',
      'name'
    );
    res.send(orders);
  })
);

orderRouter.get('/cekresi/:awb/:ekspedisi',
  expressAsyncHandler(async (req, res) => {
    var awb = req.params.awb
    var apiKey= keyResi
    var ekspedisiSelected = req.params.ekspedisi
    let url = `https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${ekspedisiSelected}&awb=${awb}`
    
    request(url, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get('/city',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      // qs: {id: '12'},
      headers: {key: keyOngkir}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

orderRouter.get('/city/:id',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      qs: {province: req.params.id},
      headers: {key: keyOngkir}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

orderRouter.get('/province',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      headers: {key: keyOngkir}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

orderRouter.get('/ongkir/:id/:weight',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {key: keyOngkir, 'content-type': 'application/x-www-form-urlencoded'},
      form: {origin: '419', destination: req.params.id, weight: req.params.weight, courier: 'jne'}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

orderRouter.get('/ongkir/tiki/:id/:weight',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {key: keyOngkir, 'content-type': 'application/x-www-form-urlencoded'},
      form: {origin: '419', destination: req.params.id, weight: req.params.weight, courier: 'tiki'}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)

orderRouter.get('/ongkir/pos/:id/:weight',
  expressAsyncHandler(async (req, res) => {
    var options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {key: keyOngkir, 'content-type': 'application/x-www-form-urlencoded'},
      form: {origin: '419', destination: req.params.id, weight: req.params.weight, courier: 'pos'}
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(JSON.parse(body))
    });
  })
)



orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        uniqueCode: req.body.uniqueCode,
        phone: req.body.phone,
        totalWeight: req.body.totalWeight,
        user: req.user._id,
        courier: req.body.courier,
        courierName: req.body.courierName,
        status: req.body.status,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = 'Menunggu Pengiriman'
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
