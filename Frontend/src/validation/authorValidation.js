import * as Yup from "yup";

export const authorValidation = Yup.object().shape({
    name: Yup.string()
        .required("نام نویسنده الزامی می باشد")
        .min(3, "نام نویسنده نباید کمتر از 3 کاراکتر باشد")
        .max(255, "نام نویسنده نباید بیشتر از 255 کاراکتر باشد"),
        description: Yup.string()
        .min(4, " توضیحات نباید کمتر از 4 کاراکتر باشد")
        .max(255, " توضیحات نباید بیشتر از 255 کاراکتر باشد")
        .required(" توضیحات الزامی می باشد"),
});