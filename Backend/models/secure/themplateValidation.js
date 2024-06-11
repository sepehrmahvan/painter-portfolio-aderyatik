const Yup = require("yup");

exports.schema = Yup.object().shape({
    jobtitle: Yup.string()
        .required("نام و نام خانوادگی الزامی می باشد")
        .min(3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
        .max(255, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
 
});


