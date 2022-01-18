// const express = require('express')
import express from "express";
import { AccountModal } from "./schema.js";
import jwt from "express-jwt";
export const router = express.Router();

router.get("/", (req, res) => {
  const { skip, limit, searchText } = req.body;
  let search = new RegExp(searchText, "g");
  AccountModal.find({
    $or: [{ username: search }, { password: search }, { role: search }],
  })
    .skip(Number(skip))
    .limit(Number(limit))
    .then((data) => {
      AccountModal.find({
        $or: [{ username: search }, { password: search }, { role: search }],
      }).count().then(count =>{
        res.json({
          count:count,
          data:data});
      })
    })
    .catch((err) => {
      res.status(500).jsonp("đã xãy ra lồi rồi");
    });
});

router.post("/", (req, res) => {
  const { username } = req.body;
  AccountModal.findOne({ username: username })
    .then((data) => {
      if (data) {
        res.status(400).jsonp("user đã tồn tại");
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
  const { username, password } = req.body;
  AccountModal.findOne({ username: username, password: password })
    .then((data) => {
      if (data) {
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
  const { username, password } = req.body;
  AccountModal.findOne({ username: username })
    .then((data) => {
      if (data) {
        AccountModal.updateOne({ username: username }, req.body)
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
  const { username, password } = req.body;
  AccountModal.findOne({ username: username })
    .then((data) => {
      if (data) {
        AccountModal.deleteOne({ username: username })
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
