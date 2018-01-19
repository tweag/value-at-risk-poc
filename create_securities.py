from collections import defaultdict
from random import random, randint, choice, gauss, uniform
from uuid import uuid4
import string
import time


BUSINESS_DAYS = 260

def create_symbol():
    letters = string.ascii_uppercase
    symbol = ''
    for i in range(randint(4,5)):
        symbol = symbol + choice(letters)

    return symbol


def create_positions(symbol):
    day = 60 * 60 * 24
    now = time.time()
    positions = []
    acquire_date = time.time() - randint(day * 200, day * 365)
    price = uniform(10, 50)
    while acquire_date < now:
        large_position = randint(0, 10) < 2
        if large_position:
            quantity = uniform(10, 50)
        else:
            quantity = uniform(0.1, 5)

        positions.append({
            'symbol': symbol,
            'acquired': acquire_date,
            'quantity': quantity,
            'original_price': price,
        })
        price *= uniform(0.98, 1.03)
        acquire_date += randint(day, day*10)

    return positions


def create_date_days_ago(days_ago):
    now = time.time()
    return now - days_ago * 60 * 60 * 24

def create_security(book):
    id = str(uuid4())
    region = choice(REGIONS)
    target = uniform(-0.02, 0.025)
    symbol = create_symbol()
    quantity = uniform(10, 150)
    original_price = uniform(10, 50)
    price = original_price
    pldays = []
    for i in range(BUSINESS_DAYS):
        profit_loss = gauss(target, 0.0065)
        price *= (1 + profit_loss)
        pldays.append({
            'date': create_date_days_ago(BUSINESS_DAYS - i),
            'profit_loss': profit_loss
        })

    return (id, {
        'id': id,
        'book': book,
        'region': region,
        'symbol': symbol,
        'quantity': quantity,
        'original_price': original_price,
        'price': price,
        'pldays': pldays,
    })


def create_securities(number):
    return dict([create_security(book) for _ in range(number) for book in BOOKS])


def create_index(securities, key):
    result = defaultdict(list)
    for security in securities.values():
        result[security[key]].append(security['id'])
    return result



MANAGERS = ['JG', 'RH', 'PS']
TYPES = ['EM', 'CSArb']
BOOKS = [(manager + '-' + type_) for manager in MANAGERS for type_ in TYPES]
REGIONS = ['east', 'west', 'northeast', 'southeast', 'northwest', 'southwest']
SECURITIES = create_securities(50)
BOOK_INDEX = create_index(SECURITIES, 'book')
REGION_INDEX = create_index(SECURITIES, 'region')
