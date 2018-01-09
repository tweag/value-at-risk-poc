from random import random, randint, choice, uniform
import string
import time


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
    acquire_date = time.time() - randint(day, day * 365)
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
        price *= uniform(0.98, 1.1)
        acquire_date += randint(day, day*15)

    return positions

def create_security(id):
    symbol = create_symbol()
    positions = create_positions(symbol)
    quantity = 0
    cost_basis = 0
    for position in positions:
        quantity += position['quantity']
        cost_basis += position['original_price'] * position['quantity']
    price = positions[-1]['original_price'] * (uniform(.8, 1.4))
    for position in positions:
        position['price'] = price
    return {
        'id': id,
        'symbol': symbol,
        'price': price,
        'cost_basis': cost_basis,
        'quantity': quantity,
        'positions': positions,
    }

def create_securities(number):
  return [create_security(n) for n in range(number)]

SECURITIES = create_securities(1000)
