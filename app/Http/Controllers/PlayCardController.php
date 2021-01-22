<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class PlayCardController extends Controller
{
    /**
     * 
     */
    public function handle (Request $request) {
        $response = $this->distributeCardToPlayers($request->users);
        return $response;
    }

    /**
     * generate Card Deck
     * @return $deck // 52 cards
     */
    private function generateCardDeck ():array
    {
        
        // Spade = S, Heart = H, Diamond = D, Club = C
        // b. Card 2 to 9 are, as it is, 1=A,10=X,11=J,12=Q,13=K
        
        $suits = ['S', 'H', 'D', 'C'];
        $cards = ['A', '2', '3' ,'4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'];

        $deck = [];
        foreach ($suits as $type) {
            foreach ($cards as $card) {
                array_push($deck, $type . '-' . $card);
            }
        }
        return $deck;
    }

    /**
     * @param $player // recieve number of user via form input
     * @return $playerCard // contains cards of each player
     */
    public function distributeCardToPlayers ($player):array
    {
        try {
            $deck = $this->generateCardDeck();
            shuffle($deck);
            
            $playerCard = [];
            for ($i = 0; $i < $player; $i ++) {
                $playerCard[$i] = [];
            }

            for ($i = 0; $i < count($deck); $i ++) {
                $mod = (int)fmod($i, $player);
                $playerCard[$mod][] = $deck[$i];
            }

            return $playerCard;
        } catch (\Throwable $th) {
            throw new Exception($th->getMessage());
        }
    }
}
