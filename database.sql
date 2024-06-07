--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: basket_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.basket_products (
    quantity integer DEFAULT 1,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    basket_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.basket_products OWNER TO postgres;

--
-- Name: baskets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.baskets (
    id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.baskets OWNER TO postgres;

--
-- Name: baskets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.baskets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.baskets_id_seq OWNER TO postgres;

--
-- Name: baskets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.baskets_id_seq OWNED BY public.baskets.id;


--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    order_id integer
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    amount integer NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    comment character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: product_props; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_props (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    product_id integer
);


ALTER TABLE public.product_props OWNER TO postgres;

--
-- Name: product_props_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_props_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_props_id_seq OWNER TO postgres;

--
-- Name: product_props_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_props_id_seq OWNED BY public.product_props.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    rating integer DEFAULT 0,
    image character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    category_id integer,
    brand_id integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    rate integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    product_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    role character varying(255) DEFAULT 'USER'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: baskets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baskets ALTER COLUMN id SET DEFAULT nextval('public.baskets_id_seq'::regclass);


--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: product_props id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_props ALTER COLUMN id SET DEFAULT nextval('public.product_props_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: basket_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.basket_products (quantity, created_at, updated_at, basket_id, product_id) FROM stdin;
\.


--
-- Data for Name: baskets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.baskets (id, created_at, updated_at) FROM stdin;
1	2024-06-05 17:47:25.469+00	2024-06-05 17:47:25.469+00
3	2021-12-06 13:15:36.763+00	2021-12-06 13:15:36.763+00
4	2021-12-06 13:16:19.377+00	2021-12-06 13:16:19.377+00
5	2021-12-06 13:17:50.942+00	2021-12-06 13:17:50.942+00
6	2021-12-06 13:19:17.509+00	2021-12-06 13:19:17.509+00
7	2021-12-06 13:21:17.856+00	2021-12-06 13:21:17.856+00
8	2021-12-06 13:39:34.386+00	2021-12-06 13:39:34.386+00
9	2021-12-06 13:40:23.737+00	2021-12-06 13:40:23.737+00
10	2021-12-06 13:41:47.306+00	2021-12-06 13:41:47.306+00
11	2021-12-06 13:43:01.965+00	2021-12-06 13:43:01.965+00
12	2021-12-06 13:47:43.839+00	2021-12-06 13:47:43.839+00
13	2021-12-06 13:52:17.305+00	2021-12-06 13:52:17.305+00
14	2021-12-06 13:55:47.192+00	2021-12-06 13:55:47.192+00
15	2022-01-06 11:52:26.859+00	2022-01-06 11:52:26.859+00
16	2022-01-06 11:54:31.701+00	2022-01-06 11:54:31.701+00
17	2022-01-06 11:54:39.164+00	2022-01-06 11:54:39.164+00
18	2022-01-06 11:55:34.705+00	2022-01-06 11:55:34.705+00
19	2022-01-06 11:55:41.728+00	2022-01-06 11:55:41.728+00
20	2022-01-06 11:55:52.828+00	2022-01-06 11:55:52.828+00
21	2022-01-06 11:56:15.76+00	2022-01-06 11:56:15.76+00
22	2022-01-06 12:01:25.607+00	2022-01-06 12:01:25.607+00
23	2022-01-06 12:05:02.88+00	2022-01-06 12:05:02.88+00
24	2022-01-06 12:05:23.058+00	2022-01-06 12:05:23.058+00
25	2022-01-06 12:07:59.899+00	2022-01-06 12:07:59.899+00
26	2022-01-06 12:08:02.705+00	2022-01-06 12:08:02.705+00
27	2022-01-06 12:08:11.787+00	2022-01-06 12:08:11.787+00
28	2022-01-06 12:08:16.727+00	2022-01-06 12:08:16.727+00
29	2022-01-06 12:08:19.7+00	2022-01-06 12:08:19.7+00
30	2022-01-07 06:52:09.273+00	2022-01-07 06:52:09.273+00
31	2022-01-07 09:04:17.392+00	2022-01-07 09:04:17.392+00
32	2022-01-07 09:04:23.891+00	2022-01-07 09:04:23.891+00
33	2022-01-07 09:06:45.405+00	2022-01-07 09:06:45.405+00
34	2022-01-07 09:06:55.065+00	2022-01-07 09:06:55.065+00
35	2022-01-07 09:07:28.213+00	2022-01-07 09:07:28.213+00
36	2022-01-07 09:08:05.64+00	2022-01-07 09:08:05.64+00
37	2022-01-07 09:25:15.763+00	2022-01-07 09:25:15.763+00
38	2022-01-08 09:22:00.939+00	2022-01-08 09:22:00.939+00
39	2022-01-17 13:49:50.526+00	2022-01-17 13:49:50.526+00
40	2022-01-17 13:50:21.6+00	2022-01-17 13:50:21.6+00
41	2022-01-17 13:56:55.263+00	2022-01-17 13:56:55.263+00
42	2022-01-17 13:59:35.304+00	2022-01-17 13:59:35.304+00
43	2022-01-17 14:02:56.956+00	2022-01-17 14:02:56.956+00
44	2022-01-17 14:09:55.318+00	2022-01-17 14:09:55.318+00
45	2022-01-17 14:10:06.146+00	2022-01-17 14:10:06.146+00
46	2022-01-17 14:13:24.91+00	2022-01-17 14:13:24.91+00
47	2022-01-17 14:14:28.474+00	2022-01-17 14:14:28.474+00
48	2024-06-07 10:37:42.897+00	2024-06-07 10:37:42.897+00
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, created_at, updated_at) FROM stdin;
19	Ранок	2024-06-07 08:21:55.441+00	2024-06-07 08:21:55.441+00
20	Видавництво Старого Лева	2024-06-07 08:22:34.321+00	2024-06-07 08:22:34.321+00
21	Vivat	2024-06-07 08:23:04.875+00	2024-06-07 08:23:04.875+00
22	Книжковий клуб "Клуб сімейного дозвілля"	2024-06-07 08:23:44.425+00	2024-06-07 08:23:44.425+00
23	Талант	2024-06-07 09:42:33.418+00	2024-06-07 09:42:33.418+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, created_at, updated_at) FROM stdin;
17	Художня література	2024-06-07 08:19:23.191+00	2024-06-07 08:19:23.191+00
18	Бізнес, гроші, економіка	2024-06-07 08:19:39.938+00	2024-06-07 08:19:39.938+00
19	Саморозвиток. Мотивація	2024-06-07 08:19:57.972+00	2024-06-07 08:19:57.972+00
20	Дитяча література	2024-06-07 08:20:09.671+00	2024-06-07 08:20:09.671+00
21	Історія	2024-06-07 08:20:17.673+00	2024-06-07 08:20:17.673+00
22	Комікси і графічні романи	2024-06-07 08:20:30.854+00	2024-06-07 08:20:30.854+00
23	Кулінарія. Їжа та напої	2024-06-07 08:20:51.257+00	2024-06-07 08:20:51.257+00
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, name, price, quantity, created_at, updated_at, order_id) FROM stdin;
9	1984	250	1	2024-06-07 10:17:24.754+00	2024-06-07 10:17:24.754+00	5
10	Короткий курс історії України	400	1	2024-06-07 10:17:24.757+00	2024-06-07 10:17:24.757+00	5
11	69 спецій для Серця	320	1	2024-06-07 10:41:52.278+00	2024-06-07 10:41:52.278+00	6
12	Короткий курс історії України	400	1	2024-06-07 10:41:52.282+00	2024-06-07 10:41:52.282+00	6
13	Кохання на кінчиках пальців. Том 2	250	1	2024-06-07 10:41:52.283+00	2024-06-07 10:41:52.283+00	6
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, name, email, phone, address, amount, status, comment, created_at, updated_at, user_id) FROM stdin;
5	Микола Руденко	admin@gmail.com	+38 (098) 345-34-32	Коломия вул Дорогобич	650	0	\N	2024-06-07 10:17:24.747+00	2024-06-07 10:17:24.747+00	7
6	Шалапай Васильович	user@gmail.com	+38 (023) 345-34-32	Київ, вул. Пса Патрона 56	970	0	хочу все гарно упакованим	2024-06-07 10:41:52.272+00	2024-06-07 10:41:52.272+00	3
\.


--
-- Data for Name: product_props; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_props (id, name, value, created_at, updated_at, product_id) FROM stdin;
183	Автор	Макс Кідрук	2024-06-07 08:26:11.274+00	2024-06-07 08:26:11.274+00	122
184	Тип	Паперова	2024-06-07 08:26:11.277+00	2024-06-07 08:26:11.277+00	122
185	Мова	Українська	2024-06-07 08:26:11.278+00	2024-06-07 08:26:11.278+00	122
186	Тип обкладинки	Тверда	2024-06-07 08:26:11.279+00	2024-06-07 08:26:11.279+00	122
187	Рік видання	2017	2024-06-07 08:26:11.28+00	2024-06-07 08:26:11.28+00	122
188	Автор	Ілларіон Павлюк	2024-06-07 09:27:20.322+00	2024-06-07 09:27:20.322+00	123
189	Мова	Українська	2024-06-07 09:27:20.327+00	2024-06-07 09:27:20.327+00	123
190	Кількість сторінок	664	2024-06-07 09:27:20.329+00	2024-06-07 09:27:20.329+00	123
191	Рік видання	2020	2024-06-07 09:27:20.33+00	2024-06-07 09:27:20.33+00	123
192	Автор	Джордж Орвелл	2024-06-07 09:28:42.923+00	2024-06-07 09:28:42.923+00	124
193	Мова	Українська	2024-06-07 09:28:42.926+00	2024-06-07 09:28:42.926+00	124
194	Рік видання	2015	2024-06-07 09:28:42.927+00	2024-06-07 09:28:42.927+00	124
195	Кількість сторінок	312	2024-06-07 09:28:42.927+00	2024-06-07 09:28:42.927+00	124
196	Автор	Наполеон Гілл	2024-06-07 09:30:38.874+00	2024-06-07 09:30:38.874+00	125
197	Мова	Українська	2024-06-07 09:30:38.878+00	2024-06-07 09:30:38.878+00	125
198	Рік видання	2017	2024-06-07 09:30:38.879+00	2024-06-07 09:30:38.879+00	125
199	Кількість сторінок	256	2024-06-07 09:30:38.88+00	2024-06-07 09:30:38.88+00	125
200	Мова	Українська	2024-06-07 09:35:55.126+00	2024-06-07 09:35:55.126+00	133
201	Рік видання	2023	2024-06-07 09:35:55.13+00	2024-06-07 09:35:55.13+00	133
202	Кількість сторінок	224	2024-06-07 09:35:55.132+00	2024-06-07 09:35:55.132+00	133
203	Рік видання	2023	2024-06-07 09:37:47.871+00	2024-06-07 09:37:47.871+00	134
204	Кількість сторінок	112	2024-06-07 09:37:47.873+00	2024-06-07 09:37:47.873+00	134
205	Мова	Українська	2024-06-07 09:37:47.874+00	2024-06-07 09:37:47.874+00	134
206	Автор	Наталія Стукман	2024-06-07 09:41:45.641+00	2024-06-07 09:41:45.641+00	135
207	Кількість сторінок	64	2024-06-07 09:41:45.643+00	2024-06-07 09:41:45.643+00	135
208	Рік видання	2020	2024-06-07 09:41:45.644+00	2024-06-07 09:41:45.644+00	135
209	Мова	Українська	2024-06-07 09:43:33.672+00	2024-06-07 09:43:33.672+00	136
210	Кількість сторінок	160	2024-06-07 09:43:33.675+00	2024-06-07 09:43:33.675+00	136
211	Рік видання	2021	2024-06-07 09:43:33.676+00	2024-06-07 09:43:33.676+00	136
212	Автор	Боріс Джонсон	2024-06-07 10:09:10.516+00	2024-06-07 10:09:10.516+00	137
213	Мова	Українська	2024-06-07 10:09:10.523+00	2024-06-07 10:09:10.523+00	137
214	Кількість сторінок	400	2024-06-07 10:09:10.525+00	2024-06-07 10:09:10.525+00	137
215	Рік видання	2019	2024-06-07 10:09:10.526+00	2024-06-07 10:09:10.526+00	137
216	Мова	Українська	2024-06-07 10:10:15.98+00	2024-06-07 10:10:15.98+00	138
217	Кількість сторінок	256	2024-06-07 10:10:15.983+00	2024-06-07 10:10:15.983+00	138
218	Рік видання	2023	2024-06-07 10:10:15.984+00	2024-06-07 10:10:15.984+00	138
219	Укладач	Олег Однороженко	2024-06-07 10:10:15.985+00	2024-06-07 10:10:15.985+00	138
220	Автор	Олександр Палій	2024-06-07 10:11:39.43+00	2024-06-07 10:11:39.43+00	139
221	Мова	Українська	2024-06-07 10:11:39.436+00	2024-06-07 10:11:39.436+00	139
222	Кількість сторінок	464	2024-06-07 10:11:39.437+00	2024-06-07 10:11:39.437+00	139
223	Рік видання	2023	2024-06-07 10:11:39.438+00	2024-06-07 10:11:39.438+00	139
224	Автор	Джозеф Нгуєн	2024-06-07 10:13:26.859+00	2024-06-07 10:13:26.859+00	140
225	Мова	Українська	2024-06-07 10:13:26.862+00	2024-06-07 10:13:26.862+00	140
226	Кількість сторінок	168	2024-06-07 10:13:26.864+00	2024-06-07 10:13:26.864+00	140
227	Рік видання	2023	2024-06-07 10:13:26.864+00	2024-06-07 10:13:26.864+00	140
228	Автор	Ліндсі К. Гібсон	2024-06-07 10:14:58.624+00	2024-06-07 10:14:58.624+00	141
229	Мова	Українська	2024-06-07 10:14:58.628+00	2024-06-07 10:14:58.628+00	141
230	Кількість сторінок	248	2024-06-07 10:14:58.629+00	2024-06-07 10:14:58.629+00	141
231	Рік видання	2022	2024-06-07 10:14:58.63+00	2024-06-07 10:14:58.63+00	141
232	Автор	Сунь-цзи	2024-06-07 10:16:25.722+00	2024-06-07 10:16:25.722+00	142
233	Мова	Українська	2024-06-07 10:16:25.724+00	2024-06-07 10:16:25.724+00	142
234	Кількість сторінок	112	2024-06-07 10:16:25.725+00	2024-06-07 10:16:25.725+00	142
235	Рік видання	2015	2024-06-07 10:16:25.73+00	2024-06-07 10:16:25.73+00	142
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, rating, image, created_at, updated_at, category_id, brand_id) FROM stdin;
122	Не озирайся і мовчи	1000	0	9efaabba-fe5c-4f38-b488-26a56a194b43.jpeg	2024-06-07 08:26:11.183+00	2024-06-07 09:25:08.946+00	17	22
123	Я бачу, вас цікавить пітьма	500	0	a9904e32-176e-4433-a6d2-411b804828de.png	2024-06-07 09:27:20.235+00	2024-06-07 09:27:20.235+00	17	20
124	1984	250	0	7d81c015-10d7-422f-8e63-de6fc8e2d42c.png	2024-06-07 09:28:42.851+00	2024-06-07 09:28:42.851+00	17	21
125	Думай і багатій	270	0	08d7f5ee-bc2c-4395-bf74-1c691558c55c.png	2024-06-07 09:30:38.774+00	2024-06-07 09:30:38.774+00	18	22
131	Кохання на кінчиках пальців. Том 2	250	0	52b73601-fcda-413d-8aa1-8d24ee6ff9ae.png	2024-06-07 09:33:37.339+00	2024-06-07 09:33:37.339+00	22	21
132	Фріжель і Флаффі. Том 1. Таємниця загублених кавунів	250	0	ce31338d-0b93-40fa-8762-8a492bc5dfb8.png	2024-06-07 09:34:14.183+00	2024-06-07 09:34:14.183+00	22	19
133	69 спецій для Серця	320	0	8e6115e8-72cc-4d60-a598-e5227f3eab39.png	2024-06-07 09:35:54.977+00	2024-06-07 09:35:54.977+00	23	20
134	Едісон. Таємниця зниклого мишачого скарбу	234	0	5748df9a-6083-46d8-b749-8f13dd749e94.png	2024-06-07 09:37:47.784+00	2024-06-07 09:37:47.784+00	20	20
135	Little Corgi Learns to count	120	0	9b0f4cde-06d8-4233-a735-6ba9cbeadc40.png	2024-06-07 09:41:45.543+00	2024-06-07 09:41:45.543+00	20	19
136	Малим дітям про все на світі. Енциклопедія в казках	423	0	8ae5e7c1-217f-4541-8924-cce091b3703d.png	2024-06-07 09:43:33.561+00	2024-06-07 09:43:33.561+00	20	23
137	Фактор Черчилля. Як одна людина змінила історію	360	0	217c2338-5e0b-41e3-82ec-62fd669c5775.png	2024-06-07 10:09:10.407+00	2024-06-07 10:09:10.407+00	21	21
138	Український націоналізм. Основи ідеології	300	0	956ca48b-8eec-4a1f-baf7-9151754436ba.png	2024-06-07 10:10:15.864+00	2024-06-07 10:10:15.864+00	21	23
139	Короткий курс історії України	400	0	5e8cd221-45d6-4b43-96a6-2402d56042bf.png	2024-06-07 10:11:39.316+00	2024-06-07 10:11:39.316+00	21	22
140	Не вірте всьому, що думаєте. Чому ваше мислення — це початок і кінець страждання	160	0	bd6e7f75-bca3-457a-9daf-a3c0c39a3c8e.png	2024-06-07 10:13:26.746+00	2024-06-07 10:13:26.746+00	19	19
141	Вільні діти емоційно незрілих батьків	355	0	96295d6f-8041-4fc0-8091-f6104935c3b7.png	2024-06-07 10:14:58.515+00	2024-06-07 10:14:58.515+00	19	23
142	Мистецтво війни	196	0	ba9f231e-3bcf-496d-a3b1-1836bd070a22.png	2024-06-07 10:16:25.639+00	2024-06-07 10:16:25.639+00	19	22
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (rate, created_at, updated_at, product_id, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, created_at, updated_at) FROM stdin;
4	admin@gmail.com\n	$2b$05$3i6B3E6ns0zqXgZsSNDHc.K0W3mnss6lJ0C46P2uaZXb3q2iwhsX6	ADMIN	2021-12-29 10:10:01.557+00	2021-12-29 10:10:01.557+00
5	admin2@gmail.com	$2b$05$o9l/.S2YTcox/yo1/9zlNebDbTkUnz.F83N4rA24HZSLQVYREUtFu	ADMIN	2021-12-29 10:11:01.522+00	2021-12-29 10:11:01.522+00
3	user@gmail.com	$2b$05$33KYYLYkDqkqlwru0eHev.Wp9t47/176gW0OCdwIndgagn7QU6Lde	USER	2021-12-25 10:56:40.236+00	2021-12-25 10:56:40.236+00
6	user2@gmail.com	$2b$05$yWp3WEcYdJB7/DjmycrbBeeQ0hsG6klGQx5BRHDw80eE9KCEZijxq	USER	2021-12-29 10:22:52.966+00	2021-12-29 10:22:52.966+00
7	admin@gmail.com	$2b$05$7vmpGVu.d/BmjMdTEab75uyIqeCp9ShtBc8XQEmrzo1q6LjOB.UEa	ADMIN	2024-06-07 08:14:11.852+00	2024-06-07 08:14:11.852+00
\.


--
-- Name: baskets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.baskets_id_seq', 48, true);


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 23, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 23, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 13, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 6, true);


--
-- Name: product_props_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_props_id_seq', 235, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 142, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: basket_products basket_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT basket_products_pkey PRIMARY KEY (basket_id, product_id);


--
-- Name: baskets baskets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT baskets_pkey PRIMARY KEY (id);


--
-- Name: brands brands_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_name_key UNIQUE (name);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: product_props product_props_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_props
    ADD CONSTRAINT product_props_pkey PRIMARY KEY (id);


--
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (product_id, user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: basket_products basket_products_basket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT basket_products_basket_id_fkey FOREIGN KEY (basket_id) REFERENCES public.baskets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: basket_products basket_products_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT basket_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: product_props product_props_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_props
    ADD CONSTRAINT product_props_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ratings ratings_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

