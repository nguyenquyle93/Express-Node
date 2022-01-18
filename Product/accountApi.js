// const express = require('express')
import express from "express";
import { AccountModal } from "./schema.js";
import jwt from 'express-jwt';
export const router = express.Router();

router.get("/", (req, res) => {
  let searchText = new RegExp(req.body.searchText,"g")
  AccountModal.find({$or:[ {'username':searchText}, {'password':searchText}, {'role':searchText}]})
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).jsonp("đã xãy ra lồi rồi");
    });
});

router.post("/", (req, res) => {
  AccountModal.findOne({ username: req.body.username })
    .then((data) => {
      if (data) {
        res.status(500).jsonp("user đã tồn tại");
      } else {
        AccountModal.create(req.body)
          .then((data) => {
            res.status(200).jsonp(req.body);
          })
          .catch((err) => {
            res.status(400).jsonp("đã xãy ra lồi rồi");
          });
      }
    })
    .catch((err) => {
      res.status(500).jsonp("đã xãy ra lồi rồi");
    });
});

router.post("/login", (req, res) => {
  AccountModal.findOne({ username: req.body.username, password: req.body.password })
    .then((data) => {
      if(data){
        res.status(200).jsonp("Login thành công");
      } else {
        res.status(400).jsonp("Tài khoản không chính xác");
      }
    })
    .catch((err) => {
      res.status(500).jsonp("đã xãy ra lồi rồi");
    });
});

router.put("/", (req, res) => {
  AccountModal.findOne({ username: req.body.username })
    .then((data) => {
      if (data) {
        AccountModal.updateOne({ username: req.body.username }, req.body)
        .then((data) => {
          res.jsonp(req.body);
        })
        .catch((err) => {
          res.status(400).jsonp("update user thất bại");
        });
      } else {
        res.status(400).jsonp("không tìm thấy user");
      }
    })
    .catch((err) => {
      res.status(500).jsonp("đã xãy ra lồi rồi");
    });
});

router.delete("/", (req, res) => {
  AccountModal.findOne({ username: req.body.username })
    .then((data) => {
      if (data) {
        AccountModal.deleteOne({ username: req.body.username })
        .then((data) => {
          res.jsonp(req.body);
        })
        .catch((err) => {
          res.status(400).jsonp("delete user thất bại");
        });
      } else {
        res.status(400).jsonp("không tìm thấy user");
      }
    })
    .catch((err) => {
      res.status(500).jsonp("đã xãy ra lồi rồi");
    });
});

router.get("/:productId", (req, res) => {
  res.json("Hello World home from router product!" + req.params.productId);
});
