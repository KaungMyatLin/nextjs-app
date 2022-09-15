import Head from 'next/head'
import styles from './form.module.css'
import { Fragment, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import httpUtils from '../../lib/http-util'
import { useRouter } from 'next/router'

function form() {
    const nmInpEl = useRef(null);
    const phInpEl = useRef(null);
    const emInpEl = useRef(null);
    const addrInpEl = useRef(null);
    const rmrkInpEl = useRef(null);
    const amtInpEl = useRef(null);
    const router = useRouter()

    function validate() {
        const schema = Yup.object({
            name: Yup.string().trim()
                .max(20, "Your name length must be max ${max} characters or less")
                .required("Required"),
            phone: Yup.number()
                .positive("Your phone number must be positive")
                .integer("Your phone number must be integer")
                .moreThan(9, "Your phone number must be max ${more} digits or less")
                .required("Required"),
            email: Yup.string().trim()
                .email("Your email must be valid email addresss`")
                .required("Required"),
            amount: Yup.number()
                .positive("Entered total amount must be positive")
                .integer("Entered total amount must be integer")
                .min(199, "Entered total amount must be more than ${min} in value")
                .required("Required"),
            address: Yup.string().trim()
                .min(10, "Your address length must be min ${min} characters or more"),
            remark: Yup.string().trim(),
        })
        schema.validate({ name: 'abcdefghijklmnopqrst', phone: parseInt("123456789"), email: 'abc@g.com', amount: parseInt("200")}).catch(function (err) {
            console.log(err);
            console.log(err.errors);
        });
        return schema
        // const errors = {};
        // console.log("errors");
        // if (!values.name) {
        //     errors.name = 'Required';
        // } else if (values.name.length > 20) {
        //     errors.name = 'Must be 20 characters or less';
        // }

        // if (!values.phone) {
        //     errors.phone = 'Required';
        // } else if (values.phone.length > 9) {
        //     errors.phone = 'Must be 9 characters or less';
        // }

        // if (!values.email) {
        //     errors.email = 'Required';
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid email address';
        // }

        // if (!values.amount) {
        //     errors.amount = 'Required';
        // } else if (values.amount < 200) {
        //     errors.amount = 'Invalid amount';
        // }
        // return errors;
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            address: '',
            remark: '',
            amount: ''
        },
        validate,
        onSubmit: async () => {
            const [ encryptstr_payload, hashText] = await httpUtils(nmInpEl.current.value, amtInpEl.current.value
                , emInpEl.current.value, rmrkInpEl.current.value, phInpEl.current.value, addrInpEl.current.value);
                alert(`${encryptstr_payload} and ${hashText}`)
            router.push(`https://form.dinger.asia?payload=${encryptstr_payload}&hashValue=${hashText}`)
        },
    });

    return (
        <Fragment>
            <Head>
            <title>Payment form</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.container}`}>
                <section className={styles.section}>
                    <div className={styles.logoContainer}>
                        <Link href='/' alt="Logo">
                            <a> <Image src="/images/site/dinger_logo.svg" width={400} height={300}/> </a>
                        </Link>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.formContainer}>
                        <form onSubmit={formik.handleSubmit} className={styles.form}>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <span className="color: red !important; display: inline; float: none;">*</span>
                                    <label htmlFor="name">Customer Name</label>
                                </div>
                                <input className={styles.inputColumn}
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder="Customer Name"
                                ref={nmInpEl}
                                required
                                maxLength={20}
                                />
                                {formik.errors.name ? <div className={styles.errors}>{formik.errors.name}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <span className="color: red !important; display: inline; float: none;">*</span>
                                    <label htmlFor="phone">Customer Phone</label>
                                </div>
                                <input className={styles.inputColumn}
                                id="phone"
                                name="phone"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                placeholder="Customer Phone"
                                ref={phInpEl}
                                required
                                />
                                {formik.errors.phone ? <div className={styles.errors}>{formik.errors.phone}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <span className="color: red !important; display: inline; float: none;">*</span>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <input className={styles.inputColumn}
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="Email"
                                ref={emInpEl}
                                required
                                />
                                {formik.errors.email ? <div className={styles.errors}>{formik.errors.email}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <label htmlFor="address">Customer Address</label>
                                </div>
                                <input className={styles.inputColumn}
                                id="address"
                                name="address"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                placeholder="Customer Address"
                                ref={addrInpEl}
                                minLength={10}
                                />
                                {formik.errors.address ? <div className={styles.errors}>{formik.errors.address}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <label htmlFor="remark">Description</label>
                                </div>
                                <input className={styles.inputColumn}
                                id="remark"
                                name="remark"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.remark}
                                placeholder="Description"
                                ref={rmrkInpEl}
                                />
                                {formik.errors.remark ? <div className={styles.errors}>{formik.errors.remark}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <span className="color: red !important; display: inline; float: none;">*</span>
                                    <label htmlFor="amount">Total Amount</label>
                                </div>
                                <input className={styles.inputColumn}
                                id="amount"
                                name="amount"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.amount}
                                placeholder="Total Amount"
                                ref={amtInpEl}
                                required
                                />
                                {formik.errors.amount ? <div className={styles.errors}>{formik.errors.amount}</div> : null}
                            </div>
                            <div className={`${styles.buttonContainer} ${styles["form-control"]}`} >
                                <button type="submit" className={styles.button} >Submit</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default form