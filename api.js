const express = require('express');
const router = express.Router();
const User = require('./User');
const Admin = require('./Admin');
const Acc_product = require('./Acc_product');

router.post('/products/request', async (req, res) => {
    const data = req.body;
    try {
      await Acc_product.create({
        user_id: data.user_id,
        product_id: data.product_id,
        is_acc: false,
        request_date: Date.now(),
      }).then((data) =>
        res.status(200).json({
          status: true,
          message: 'Acc product nya',
          data: data,
        })
      );
    } catch (e) {
      res.status(500).json({
        status: false,
        message: e,
        data: null,
      });
    }
  });


router.patch('/products/approve/:requestId', async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const result = await Acc_product.findByPk(requestId);

    if (result == null) {
      res.status(404).json({
        status: false,
        message: 'Data tidak ditemukan',
        data: result,
      });
      return;
    }

    result.set({
      is_acc: true,
      acc_date: Date.now(),
      admin_id: 1,
    }).save()

    res.status(200).json({
      status: true,
      message: 'Berhasil',
      data: result,
    });

  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      data: null,
    });
  }
});


module.exports = router;