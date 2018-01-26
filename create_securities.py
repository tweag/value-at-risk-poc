from collections import defaultdict
from random import random, randint, choice, gauss, uniform
from uuid import uuid4
import string
import time


BUSINESS_DAYS = 260


def create_symbol():
    letters = string.ascii_uppercase
    symbol = ''
    for i in range(randint(4, 5)):
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
        acquire_date += randint(day, day * 10)

    return positions


def create_date_days_ago(days_ago):
    now = time.time()
    return now - days_ago * 60 * 60 * 24


def create_security(book):
    id = str(uuid4())
    region = choice(REGIONS)
    target = uniform(-0.01, 0.012)
    symbol = create_symbol()
    quantity = uniform(10, 150)
    original_price = uniform(5, 25)
    price = original_price
    pldays = []
    for i in range(BUSINESS_DAYS):
        profit_loss = gauss(target, 0.0165)
        profit_loss_value = price * profit_loss
        price += profit_loss_value
        pldays.append({
            'date': create_date_days_ago(BUSINESS_DAYS - i),
            'profit_loss': profit_loss,
            'profit_loss_value': profit_loss_value,
        })

    value_at_risk_1 = sorted(
        pldays, key=lambda plday: plday['profit_loss']
    )[int(len(pldays) * 0.01)]['profit_loss'] * quantity * price

    value_at_risk_5 = sorted(
        pldays, key=lambda plday: plday['profit_loss']
    )[int(len(pldays) * 0.05)]['profit_loss'] * quantity * price

    return (id, {
        'id': id,
        'book': book,
        'region': region,
        'symbol': symbol,
        'quantity': quantity,
        'original_price': original_price,
        'price': price,
        'pldays': pldays,
        'value_at_risk_1': value_at_risk_1,
        'value_at_risk_5': value_at_risk_5
    })


def create_index(securities, key):
    result = defaultdict(list)
    for security in securities.values():
        result[security[key]].append(security['id'])
    return result


def calc_cost_basis(security_ids):
    return sum([
        SECURITIES[id]['original_price'] * SECURITIES[id]['quantity']
        for id in security_ids
    ])


def calc_market_value(security_ids):
    return sum([
        SECURITIES[id]['price'] * SECURITIES[id]['quantity']
        for id in security_ids
    ])


def calc_profit_loss(security_ids):
    return calc_market_value(security_ids) - calc_cost_basis(security_ids)


def zip_pldays(security_ids):
    result = defaultdict(int)
    for id in security_ids:
        quantity = SECURITIES[id]['quantity']
        for index, plday in enumerate(SECURITIES[id]['pldays']):
            result[index] += plday['profit_loss_value'] * quantity
    return result.values()


def calc_value_at_risk_securities(security_ids, percentage):
    pldays = zip_pldays(security_ids)
    value_at_risk = sorted(pldays)[int(len(pldays) * percentage)]
    return value_at_risk


def create_securities(number):
    return dict([create_security(book) for _ in range(number) for book in BOOKS])


MANAGERS = ['JG', 'RH', 'PS', 'DM', 'TF', 'CR', 'TC', 'RZ', 'AB', 'GS', 'MN']
TYPES = ['EM', 'CSArb']
BOOKS = [(manager + '-' + type_) for manager in MANAGERS for type_ in TYPES]
REGIONS = ['APAC', 'EMEA', 'LATAM', 'NAMER']
SECURITIES = create_securities(100)
BOOK_INDEX = create_index(SECURITIES, 'book')
REGION_INDEX = create_index(SECURITIES, 'region')
