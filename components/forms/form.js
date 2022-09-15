import Head from 'next/head'
import styles from './form.module.css'
import { Fragment, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useFormik } from 'formik';
import constants from '../../constants/constants'
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

    async function validate (values) {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length > 20) {
            errors.name = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.amount) {
            errors.amount = 'Required';
        } else if (parseInt(values.amount) < 200) {
            errors.amount = 'Invalid amount';
        }
        return errors;
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
            onSubmit: async values => {
                const [ encryptstr_payload, hashText] = await httpUtils(values, nmInpEl, amtInpEl);
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

            <div className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                            <Link href='/' alt="Logo">
                                <a> <Image src="/images/site/dinger_logo.svg" width={400} height={300}/> </a>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.formContainer}>
                        <form onSubmit={formik.handleSubmit} className={styles.form}>
                            <div className={styles["form-control"]} >
                                <label htmlFor="name" className={styles.labelColumn}>Customer Name</label>
                                <input className={styles.inputColumn}
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                ref={nmInpEl}
                                required
                                maxLength={20}
                                />
                                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                            </div>

                            <div className={styles["form-control"]} >
                                <label htmlFor="phone" className={styles.labelColumn}>Customer Phone</label>
                                <input className={styles.inputColumn}
                                id="phone"
                                name="phone"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                ref={phInpEl}
                                required
                                />
                                {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                            </div>

                            <div className={styles["form-control"]} >
                                <label htmlFor="email" className={styles.labelColumn}>Email</label>
                                <input className={styles.inputColumn}
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                ref={emInpEl}
                                required
                                />
                                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            </div>

                            <div className={styles["form-control"]} >
                                <label htmlFor="address" className={styles.labelColumn}>Customer Address</label>
                                <input className={styles.inputColumn}
                                id="address"
                                name="address"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                ref={addrInpEl}
                                minLength={10}
                                />
                                {formik.errors.address ? <div>{formik.errors.address}</div> : null}
                            </div>

                            <div className={styles["form-control"]} >
                                <label htmlFor="remark" className={styles.labelColumn}>Description</label>
                                <input className={styles.inputColumn}
                                id="remark"
                                name="remark"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.remark}
                                ref={rmrkInpEl}
                                />
                                {formik.errors.remark ? <div>{formik.errors.remark}</div> : null}
                            </div>

                            <div className={styles["form-control"]} >
                                <label htmlFor="amount" className={styles.labelColumn}>Total Amount</label>
                                <input className={styles.inputColumn}
                                id="amount"
                                name="amount"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.amount}
                                ref={amtInpEl}
                                required
                                />
                                {formik.errors.amount ? <div>{formik.errors.amount}</div> : null}
                            </div>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default form