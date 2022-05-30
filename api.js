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
        is_acc: data.is_acc,
        request_date: data.request_date,
        acc_date: data.acc_date,
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


router.patch('/products/approve/:productId', async (req, res) => {
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
      status: true
    }).save()

    const user = await User.findByPk(result.user_id)
    user.set({
      is_seller: true
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