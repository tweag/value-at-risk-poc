from random import random, randint, choice, uniform
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

def create_security(id):
    good_day = uniform(0.01, 0.02)
    bad_day = uniform(-0.02, 0)
    symbol = create_symbol()
    quantity = uniform(10, 150)
    original_price = uniform(10, 50)
    price = original_price
    pldays = []
    for i in range(BUSINESS_DAYS):
        profit_loss = uniform(bad_day, good_day)
        price *= (1 + profit_loss)
        pldays.append({
            'date': create_date_days_ago(BUSINESS_DAYS - i),
            'profit_loss': profit_loss
        })

    return {
        'id': id,
        'symbol': symbol,
        'quantity': quantity,
        'original_price': original_price,
        'price': price,
        'pldays': pldays,
    }

def create_securities(number):
  return [create_security(n) for n in range(number)]

SECURITIES = create_securities(500)
