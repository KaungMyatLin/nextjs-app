import Head from 'next/head'
import styles from './form.module.css'
import { Fragment, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Formik } from 'formik';
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

    const schemaValidation = Yup.object({
            name: Yup.string().trim()
                .max(20, "Your name length must be max ${max} characters or less")
                .required("Required"    ),
            phone: Yup.number()
                .positive("Your phone number must be positive")
                .integer("Your phone number must be integer")
                .moreThan(9, "Your phone number must be max ${more} digits or less")
                .required("Required"),
            email: Yup.string().trim()
                .email("Your email must be valid email addresss`")
                .required("Required"),
            address: Yup.string().trim()
                .min(10, "Your address length must be min ${min} characters or more"),
            remark: Yup.string().trim(),
            amount: Yup.number()
                .positive("Entered total amount must be positive")
                .integer("Entered total amount must be integer")
                .min(199, "Entered total amount must be more than ${min} in value")
                .required("Required"),
    })
        // const formObj = await schema.validate({ name: 'abcdefghijklmnopqrst', phone: parseInt("123456789"), email: 'abc@g.com', amount: parseInt("200")}).catch(function (err) {
        //     console.log(err);
        //     console.log(err.errors);
        // });
        // console.log(formObj)
                                                                                                                    
    return (
        <Fragment>
            <Head>
            <title>Payment form</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                        email: '',
                        address: '',
                        remark: '',
                        amount: ''
                    }}
                    validationSchema={schemaValidation}
                    onSubmit={async () => {
                                const [ encryptstr_payload, hashText] = await httpUtils(nmInpEl.current.value, amtInpEl.current.value
                                    , emInpEl.current.value, rmrkInpEl.current.value, phInpEl.current.value, addrInpEl.current.value);
                                    alert(`${encryptstr_payload} and ${hashText}`)
                                    console.log(`${encryptstr_payload} and ${hashText}`)
                                router.push(`https://form.dinger.asia?payload=${encryptstr_payload}&hashValue=${hashText}`)
                            }}
            >
            {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
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
                                    <span style={{color: "red !important", display: "inline", float: "none"}}>*</span>
                                    <label htmlFor="name">Customer Name</label>
                                </div>
                                <input className={`${styles.inputColumn} ${errors.name && touched.name? styles.inptouched: null}`}
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder="Customer Name"
                                ref={nmInpEl}
                                />
                                {errors.name && touched.name ? <div className={styles.errors}>{errors.name}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <span style={{color: "red !important", display: "inline", float: "none"}}>*</span>
                                    <label htmlFor="phone">Customer Phone</label>
                                </div>
                                <input className={`${styles.inputColumn} ${errors.phone && touched.phone? styles.inptouched: null}`}
                                id="phone"
                                name="phone"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                placeholder="Customer Phone"
                                ref={phInpEl}
                                />
                                {errors.phone && touched.phone ? <div className={styles.errors}>{errors.phone}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <span style={{color: "red !important", display: "inline", float: "none"}}>*</span>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <input className={`${styles.inputColumn} ${errors.email && touched.email? styles.inptouched: null}`}
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="Email"
                                ref={emInpEl}
                                />
                                {errors.email && touched.email ? <div className={styles.errors}>{errors.email}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <label htmlFor="address">Customer Address</label>
                                </div>
                                <input className={`${styles.inputColumn} ${errors.address && touched.address? styles.inptouched: null}`}
                                id="address"
                                name="address"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                placeholder="Customer Address"
                                ref={addrInpEl}
                                />
                                {errors.address && touched.address? <div className={styles.errors}>{errors.address}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <label htmlFor="remark">Description</label>
                                </div>
                                <input className={`${styles.inputColumn} ${errors.remark && touched.remark? styles.inptouched: null}`}
                                id="remark"
                                name="remark"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.remark}
                                placeholder="Description"
                                ref={rmrkInpEl}
                                />
                                {errors.remark && touched.remark? <div className={styles.errors}>{errors.remark}</div> : null}
                            </div>
                            <div className={styles["form-control"]} >
                                <div className={styles.labelColumn}>
                                    <span style={{color: "red !important", display: "inline", float: "none"}}>*</span>
                                    <label htmlFor="amount">Total Amount</label>
                                </div>
                                <input className={`${styles.inputColumn} ${errors.amount && touched.amount? styles.inptouched: null}`}
                                id="amount"
                                name="amount"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.amount}
                                placeholder="Total Amount"
                                ref={amtInpEl}
                                />
                                {errors.amount && touched.amount? <div className={styles.errors}>{errors.amount}</div> : null}
                            </div>
                            <div className={`${styles.buttonContainer} ${styles["form-control"]}`} >
                                <button type="submit" className={`${styles.button}`} 
                                    disabled={!(dirty && isValid)}
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>)}}
            </Formik>
        </Fragment>
    )
}

export default form